module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // Get detailed information for one user:
    function getUser(res, mysql, context, id, complete){
        var sql = "SELECT lastName, firstName, phone, email FROM users WHERE userId=?;";
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

    // Render the /myAccount/:id page:
    router.get('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var callbackCount = 0;
        var context = {};
 
        context.jsscripts = ["updateUser.js"];
 
        context.currentUserId = req.params.id;
 
        getUser(res, mysql, context, req.params.id, complete);

        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('myAccount', context);
            }
        }
    });

    // Handle updates to the current user's details:
    router.put('/:id', function(req, res){
        console.log(req.body)
        console.log(req.params.id)

        var mysql = req.app.get('mysql');

        var sql = "UPDATE users SET lastName=?, firstName=?, phone=?, email=? WHERE userId=?;";
        var inserts = [req.body.lastName, req.body.firstName, req.body.phone, req.body.email, req.params.id];

        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });

    return router;
}();
