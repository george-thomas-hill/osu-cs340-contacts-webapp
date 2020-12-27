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

    // Get possible emergency contacts:
    function getPossibleEmergencyContacts(res, mysql, context, userId, contactId, complete){
        var sql = "SELECT contactId, lastName, firstName FROM contacts WHERE userId=? AND contactId<>? ORDER BY lastName ASC, firstName ASC;";
        var inserts = [userId, contactId];

        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.contacts = results;
            // console.log(context.contacts);
            complete();
        });
    }

    // Get details for one contact:
    function getContact(res, mysql, context, userId, contactId, complete){
        var sql = "SELECT C.contactId, C.lastName, C.firstName, C.phone, C.email, C.notes, EC.contactId AS `ECcontactId`, EC.lastName AS `EClastName`, EC.firstName as `ECfirstName` FROM contacts AS C LEFT JOIN contacts AS EC ON EC.contactId=C.emergencyContactId WHERE C.contactId=? AND C.userId=?;";
        var inserts = [contactId, userId];

        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.contact = results[0];
            console.log(context.contact);
            complete();
        });
    }

    // Render the /:userId/:contactId page:
    router.get('/:userId/:contactId', function(req, res){
        var mysql = req.app.get('mysql');
        var callbackCount = 0;
        var context = {};

        context.jsscripts = ["selectEmergencyContact.js", "updateContact.js"];

        context.currentUserId = req.params.userId;

        getUserName(res, mysql, context, req.params.userId, complete);
        getPossibleEmergencyContacts(
            res,
            mysql,
            context,
            req.params.userId,
            req.params.contactId,
            complete
        );
        getContact(
            res,
            mysql,
            context,
            req.params.userId,
            req.params.contactId,
            complete
        );

        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('editContact', context);
            }
        }
    });

    // Handle updates to the selected contact's details:
    router.put('/:userId/:contactId', function(req, res){
        console.log(req.params.userId);
        console.log(req.params.contactId);
        console.log(req.body)

        var mysql = req.app.get('mysql');

        // Without this line, "NULL" values would be treated as if strings.
        let nullableEmergencyContactId = (req.body.emergencyContactId == "NULL") ? null : req.body.emergencyContactId;

        var sql = "UPDATE contacts SET lastName=?, firstName=?, phone=?, email=?, notes=?, emergencyContactId=? WHERE contactId=? AND userId=?;";
        var inserts = [
            req.body.lastName,
            req.body.firstName,
            req.body.phone,
            req.body.email,
            req.body.notes,
            nullableEmergencyContactId,
            req.params.contactId,
            req.params.userId
        ];

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
