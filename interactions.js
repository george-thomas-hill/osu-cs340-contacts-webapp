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

    // Get name of currently selected contact:
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

    // Get interactions of currently selected contact:
    function getInteractions(res, mysql, context, contactId, complete){
        var sql = "SELECT startDate, interactId FROM interactions WHERE contactId=? ORDER BY startDate;";
        var inserts = [contactId];

        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            for (index = 0; index < results.length; index++) { 
                let date = new Date(results[index].startDate);
                results[index].startDate = date.toLocaleDateString();
            }
            context.noResults = (results.length == 0) ? true : false;
            context.interactions = results;
            complete();
        });
    }

    // Render the /interactions page:
    router.get('/:id/:contactId', function(req, res){
        var mysql = req.app.get('mysql');
        var callbackCount = 0;
        var context = {};

        context.jsscripts = ["deleteInteraction.js"];

        context.currentUserId = req.params.id;
        context.currentCid = req.params.contactId;

        getUserName(res, mysql, context, req.params.id, complete);
        getContacts(res, mysql, context, req.params.contactId, complete);
        getInteractions(res, mysql, context, req.params.contactId, complete);
        
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('interactions', context);
            }
        }
    });
    
    // Handle deleting an interaction:
    router.delete('/:interactId', function(req, res){
        var mysql = req.app.get('mysql');

        var sql = "DELETE FROM interactions WHERE interactId=?;";
        var inserts = [req.params.interactId];

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

    // Handle adding a new interaction:
    router.post('/:userId/:contactId', function(req, res){
        console.log("POST");
        console.log(req.params);
        console.log(req.body);

        var mysql = req.app.get('mysql');

        var sql = "INSERT INTO interactions (contactId, startDate) VALUES (?, ?);";
        var inserts = [req.params.contactId, req.body.date];

        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/interactions/' + req.params.userId + "/" + req.params.contactId);
            }
        });
    });

    return router;
}();
