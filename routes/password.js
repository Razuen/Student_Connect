var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection;
var username;
var password;
var role;
var message;
router.post('/',function(req,response,next)
{
  connection=mysql.createConnection(
    {
      host:"db4free.net",
      user:"sabari",
      password:"sabari.b",
      database:"student_connect"
    }
  );
  connection.connect(function(err)
  {
    if(err)
    {
       throw err;
    }
    console.log('connected');
  });
  username = req.body.username;
  password = req.body.password;
  role = req.body.role;
  if(role=='students')
  {
   
    connection.query('SELECT password from `students` where rollno=?',[username],function(err,res,fields)
    {
      if(res.password==password)
      {
        message={
          status:"True"
        };
      }
      else
      {
        message={
          status:"False"
        };
      }
    });
  }
  else if(role=='staffs')
  {
   
    connection.query('SELECT password from `faculty` where faculty_id=?',[username],function(err,res,fields)
    {
      if(res.password==password)
      {
        message={
          status:"True"
        };
      }
      else
      {
        message={
          status:"False",
          text:"This is to test push from contributor"
        };
      }
    });
  }
response.status(500).send(message);

});
module.exports = router;
