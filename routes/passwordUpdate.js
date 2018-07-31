var express = require('express');
var mysql = require('mysql');
var router= express.Router();
var username;
var oldPassword;
var newPassword;
var message;
var role;

router.post('/', function(req, response, next)
 {
    var connection = mysql.createConnection(
        {
            host:"db4free.net",
            user:"sabari",
            password:"sabari.b",
            database:"student_connect"
          }
    );
    connection.connect(function(err)
    {
      if (err) throw err;
      console.log("connected!");
    });
    username = req.body.username;
    oldPassword = req.body.oldPassword;
    newPassword = req.body.newPassword;
    role = req.body.role;
    if(role=='students')
    {
        connection.query('SELECT password from `students` where rollno=?',[username],function(err,res,fields)
        {
        if(res.password==oldPassword)
        {
            connection.query('UPDATE `students` SET `password`= ? WHERE `rollno`= ?',[newPassword , username],function(err,results)
            {
            if(err) throw err;
            if(results.affectedRows==1)
            {
                message={
                    affectedRows:"1"
                };
            }
            else
            {
                message={
                        affectedRows:"0"
                    };
            }
            });
        }
        else
        {
            message="False";
            response.status(500).send(message);
        }
     });
    }
    else if(role=='staff')
    {
        connection.query('SELECT password from `faculty` where faculty_id=?',[username],function(err,res,fields)
        {
            if(res.password==oldPassword)
            {

                connection.query('UPDATE `faculty` SET `password`= ? WHERE `facilty_id`= ?',[password , username],function(err,results,fields)
                {
                if(err) throw err;
                if(results.affectedRows==1)
                    message={
                        affectedRows:"1"
                    };
                else
                    message={
                            affectedRows:"0"
                        }
                    
                });
            }
            else
            {
                message="False";
                response.status(500).send(message);
            }

         });
    }
    response.status(200).send(message);
  });
  
  module.exports = router;