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
      host:"localhost",
      user:"root",
      password:"",
      database:"app"
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
     // console.log(res[0].password);
      if(res.password==password)
      {
        /*message={
          status:"True"
        };*/
        console.log('True');
      }
      else
      {
        /*message={
          status:"False"
        };*/
        console.log('False');
        console.log(message);
      }
    });
  }
  response.status(200).send(message);
});
module.exports = router;