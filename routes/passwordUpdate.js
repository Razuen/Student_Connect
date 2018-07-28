var express = require('express');
var mysql = require('mysql');
var router= express.Router();
var username;
var password;
var message;
var role;

router.post('/', function(req, response, next) {
    var con = mysql.createConnection(
      {
        host:"localhost",
        user:"root",
        password:"",
        database:"app"
      }
    );
    con.connect(function(err)
    {
      if (err) throw err;
      console.log("connected!");
    });
    
    console.log(req.body);
    username = req.body.username;
    password = req.body.password;
   role = req.body.role;
   if(role=='students')
   {
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