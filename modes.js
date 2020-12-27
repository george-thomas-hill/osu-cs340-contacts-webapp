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

    // Get modes:
    function getModes(res, mysql, context, complete){
        var sql = "SELECT type FROM communicationModes ORDER BY type ASC;";

        mysql.pool.query(sql, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.modes = results;
            complete();
        });
    }

    // Render the /modes page:
    router.get('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var callbackCount = 0;
        var context = {};

        context.jsscripts = [];

        context.currentUserId = req.params.id;

        getUserName(res, mysql, context, req.params.id, complete);
        getModes(res, mysql, context, complete);

        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('modes', context);
            }
        }
    });

    // Handle adding a mode:
    router.post('/:id', function(req, res){
        console.log("POST");
        console.log(req.body);

        var mysql = req.app.get('mysql');

        var sql = "INSERT INTO communicationModes (type) VALUES (?);";
        var inserts = [req.body.mode];

        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/modes/' + req.params.id);
            }
        });
    });

    return router;
}();
