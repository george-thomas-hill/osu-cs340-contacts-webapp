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

    // Get contacts for one user, respecting search fields if provided:
    function getContacts(res, mysql, context, id, firstName, lastName, complete){
        var sql = "SELECT C.contactId, C.lastName, C.firstName, C.phone, C.email, C.notes, EC.lastName AS `EClastName`, EC.firstName as `ECfirstName` FROM contacts AS C LEFT JOIN contacts AS EC ON EC.contactId=C.emergencyContactId WHERE C.lastName LIKE ? AND C.firstName LIKE ? AND C.userId=? ORDER BY C.lastName ASC, C.firstName ASC;";
        var inserts = [lastName, firstName, id];

        // 2020-03-07: GH: This is another way to do it:
        // let mysql2 = require('mysql');
        // console.log(firstName);
        // console.log(mysql2.escape(firstName));
        // let sql = "SELECT C.contactId, C.lastName, C.firstName, C.phone, C.email, C.notes, EC.lastName AS `EC.lastName`, EC.firstName as `EC.firstName` FROM contacts AS C LEFT JOIN contacts AS EC ON EC.contactId=C.emergencyContactId WHERE C.lastName LIKE " + mysql2.escape(lastName) + " AND C.firstName LIKE " + mysql2.escape(firstName) + " AND C.userId=" + mysql2.escape(id) + " ORDER BY C.lastName ASC, C.firstName ASC;";
        // console.log("About to run sql query:", sql)

        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.noResults = (results.length == 0) ? true : false;
            context.contacts = results;
            // console.log(context.contacts);
            complete();
        });
    }

    // Render the /:id/:firstName/:lastName page:
    // Note: The tilde character (~) will be used as a placeholder
    // when no first name, or no last name, has been provided by the user.
    router.get('/:id/:firstName/:lastName', function(req, res){
        var mysql = req.app.get('mysql');
        var callbackCount = 0;
        var context = {};

        context.jsscripts = ["search.js", "deleteContact.js"];

        context.currentUserId = req.params.id;

        // Use the percent-sign wildcard so as to implement a "Contains" search.
        let searchFirstName = (req.params.firstName == "~") ? "%" : "%" + req.params.firstName + "%";
        let searchLastName = (req.params.lastName == "~") ? "%" : "%" + req.params.lastName + "%";

        getUserName(res, mysql, context, req.params.id, complete);
        getContacts(
            res,
            mysql,
            context,
            req.params.id,
            searchFirstName,
            searchLastName,
            complete
        );

        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('contacts', context);
            }
        }
    });

    // Handle delete requests:
    router.delete('/:userId/:contactId', function(req, res){
        var mysql = req.app.get('mysql');

        var sql = "DELETE FROM contacts WHERE contactId=? AND userId=?;";
        var inserts = [req.params.contactId, req.params.userId];

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

    // Handle requests to add a new contact:
    router.post('/:userId', function(req, res){
        console.log("POST");
        console.log(req.params);
        console.log(req.body);

        var mysql = req.app.get('mysql');

        // Without this line, the value "NULL" would be treated as if a string:
        let nullableEmergencyContactId = (req.body.emergencyContactId == "NULL") ? null : req.body.emergencyContactId;

        var sql = "INSERT INTO contacts (userId, lastName, firstName, phone, email, notes, emergencyContactId) VALUES (?, ?, ?, ?, ?, ?, ?);";
        var inserts = [
            req.params.userId,
            req.body.lastName,
            req.body.firstName,
            req.body.phone,
            req.body.email,
            req.body.notes,
            nullableEmergencyContactId
        ];

        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.redirect('/contacts/' + req.params.userId + "/~/~");
            }
        });
    });

    return router;
}();
