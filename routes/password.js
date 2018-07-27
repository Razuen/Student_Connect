var express = require('express');
var mysql = require('mysql');
var router= express.Router();
var username;
var password;

router.post('/', function(req, response, next) {
  console.log("Hello from password");
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
    //role = req.body.role;
   
    con.query('SELECT password FROM `students` where `rollno` = ? and `password` = ?',[username],[password],function(err,res,fields)
    {
      if(err) throw err;
      if(password==res.password)
        response.send({"success":true});
      else
        response.send({"success":false});

     });
    
  });
  
  module.exports = router;