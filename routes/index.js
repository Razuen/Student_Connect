var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var username;
var role;
var message;
/* GET home page. */
router.post('/', function(req, response, next) {
  var connection= mysql.createConnection(
    {
      host:"db4free.net",
      user:"sabari",
      password:"sabari.b",
      database:"student_connect"
    }
  );
  connection.connect(function(err)
  {
    if (err)
    { 
      throw err;
    }
    console.log("connected!");
  });
  
  username=req.body.username;
  role = req.body.role;
  if(role=='students')
  {
    connection.query('SELECT name FROM `students` where `rollno` = ? ',[username],function(err,res,fields)
    {
      if(err) throw err;
      
      message = {
        flag:"true"
      };
    });
  }
  else if(role=='faculty')
  {
    connection.query('SELECT faculty_name FROM `faculty` where `faculty_id` = ? ',[username],function(err,res,fields)
    {
      if(err) throw err;
      message ={
        flag:"false"
      };
    });
  }
response.status(200).send(message);
  
});

module.exports = router;