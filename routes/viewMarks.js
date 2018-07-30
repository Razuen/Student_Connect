var express = require('express');
var mysql = require('mysql');
var router= express.Router();
var username;


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
    
   
    con.query('SELECT * FROM `CAT_1` where `rollno` = ?',[username],function(err,res,fields)
    {
      if(err) throw err;
      response.send(200,res);

     });
    
  });
  
  module.exports = router;