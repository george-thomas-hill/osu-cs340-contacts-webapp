module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // Get name information for one user:
    function getUserName(res, mysql, context, id, complete){
        var sql = "SELECT lastName, firstName FROM users WHERE userId=?;";
        var inserts = [id];

        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.user = results[0];
            complete();
        });
    }

    // Get the name of the currently selected contact:
    function getContacts(res, mysql, context, contactId, complete){
        var sql = "SELECT lastName, firstName FROM contacts WHERE contactId=?;";
        var inserts = [contactId];

        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.contact = results[0];
            complete();
        });
    }

    // Get the date of the currently selected interaction:
    function getInteractions(res, mysql, context, interactId, complete){
        var sql = "SELECT startDate FROM interactions WHERE interactId=?;";
        var inserts = [interactId];

        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            // This formats the date attribute.
            for (index = 0; index < results.length; index++) { 
                let date = new Date(results[index].startDate);
                results[index].startDate = date.toLocaleDateString();
            }
            context.interaction = results[0];
            complete();
        });
    }

    // Get all details for the currently selected interaction;
    function getDetails(res, mysql, context, interactId, complete){
        var sql = "SELECT I.detailsId, I.startTime, I.details, C.type FROM interactionDetails AS I LEFT JOIN communicationModes AS C ON I.comId=C.comId WHERE I.interactId=? ORDER BY I.startTime;";
        var inserts = [interactId];

        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            // This formats the time attribute:
            for (index = 0; index < results.length; index++) { 
                let time = results[index].startTime;
                let hour = time.slice(0, 2);
                let minutes = time.slice(3, 5)
                let halfOfDay = (hour <= "12") ? "AM" : "PM";
                if (halfOfDay == "PM") {
                    hour = hour - 12;
                }
                hour = hour * 1; // Coerce to a number to get rid of leading zero.
                results[index].startTime = hour + ":" + minutes + " " + halfOfDay;
            }
            context.noResults = (results.length == 0) ? true : false;
            context.details = results;
            complete();
        });
    }

    // Get all modes:
    function getModes(res, mysql, context, complete){
        var sql = "SELECT comId, type FROM communicationModes ORDER BY type ASC;";

        mysql.pool.query(sql, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.modes = results;
            complete();
        });
    }

    // Render the /interactionDetails page:
    router.get('/:id/:contactId/:interactId', function(req, res){
        var mysql = req.app.get('mysql');
        var callbackCount = 0;
        var context = {};

        context.jsscripts = ["deleteDetails.js"];

        context.currentUserId = req.params.id;
        context.currentCid = req.params.contactId;
        context.currentIid = req.params.interactId;

        getUserName(res, mysql, context, req.params.id, complete);
        getContacts(res, mysql, context, req.params.contactId, complete);
        getInteractions(res, mysql, context, req.params.interactId, complete);
        getDetails(res, mysql, context, req.params.interactId, complete);
        getModes(res, mysql, context, complete);
        
        function complete(){
            callbackCount++;
            if(callbackCount >= 5){
                res.render('interactionDetails', context);
            }
        }
    });

    // Handle deleting an interaction detail:
    router.delete('/:detailsId', function(req, res){
        var mysql = req.app.get('mysql');

        var sql = "DELETE FROM interactionDetails WHERE detailsId=?;";
        var inserts = [req.params.detailsId];

        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })

    // Handle creating a new interaction detail:
    router.post('/:userId/:contactId/:interactId', function(req, res){
        console.log("POST");
        console.log(req.params);
        console.log(req.body);

        var mysql = req.app.get('mysql');

        var sql = "INSERT INTO interactionDetails (interactId, startTime, comId, details) VALUES (?, ?, ?, ?);";
        var inserts = [req.params.interactId, req.body.time, req.body.modes, req.body.details];

        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/interactionDetails/' + req.params.userId + "/" + req.params.contactId + "/" + req.params.interactId);
            }
        });
    });

    return router;
}();
