module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // Get user id's and names:
    function getUsers(res, mysql, context, complete){
        mysql.pool.query(
            "SELECT userId, lastName, firstName FROM users ORDER BY lastName ASC, firstName ASC;",
            function(error, results, fields){
               if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.users  = results;
                complete();
            }
        );
    }

    // Populate user login table with a list of all users:
    router.get('/', function(req, res){
        var mysql = req.app.get('mysql');
        var callbackCount = 0;
        var context = {};

        context.jsscripts = [];

        getUsers(res, mysql, context, complete);

        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('home', context);
            }
        }
    });

    // Add a new user:
    router.post('/', function(req, res){
        console.log("POST");
        console.log(req.body);

        var mysql = req.app.get('mysql');

        var sql = "INSERT INTO users (lastName, firstName, phone, email) VALUES (?, ?, ?, ?);";
        var inserts = [req.body.lastName, req.body.firstName, req.body.phone, req.body.email];

        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/home');
            }
        });
    });

    return router;
}();
