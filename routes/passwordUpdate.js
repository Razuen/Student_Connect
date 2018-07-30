var express = require('express');
var mysql = require('mysql');
var router= express.Router();
var username;
var oldPassword;
var newPassword;
var message;
var role;

router.post('/', function(req, response, next) {
    var con = mysql.createConnection(
        {
            host:"db4free.net",
            user:"sabari",
            password:"sabari.b",
            database:"student_connect"
          }
    );
    con.connect(function(err)
    {
      if (err) throw err;
      console.log("connected!");
    });
    
    console.log(req.body);
    username = req.body.username;
    oldPassword = req.body.oldPassword;
    newPassword = req.body.newPassword;
   role = req.body.role;
   if(role=='students')
   {
    
   
    connection.query('SELECT password from `students` where rollno=?',[username],function(err,res,fields)
    {
    // console.log(res[0].password);
    if(res.password==oldPassword)
    {
        message='TRUE';
    }
    else
    {
        message='FALSE';
        response.status(500).send(message);
        
      
    }
    });
    con.query('UPDATE `students` SET `password`= ? WHERE `rollno`= ?',[password , username],function(err,results)
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
    else if(role=='staff')
    {
        con.query('UPDATE `staffs` SET `password`= ? WHERE `staffid`= ?',[password , username],function(err,results,fields)
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
    response.status(200).send(message);
  });
  
  module.exports = router;