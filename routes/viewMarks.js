var express = require('express');
var mysql = require('mysql');
var router= express.Router();
var username;


router.post('/', function(req, response, next) {
    var connnection = mysql.createConnection(
      {
        host:"db4free.net",
        user:"sabari",
        password:"sabari.b",
        database:"student_connect"
      }
    );
    connnection.connect(function(err)
    {
      if (err) throw err;
      console.log("connected!");
    });
    username = req.body.username;
    connnection.query('',,function(err,res,feilds)
    {
      

    }); 
    
   
    
  });
  
  module.exports = router;