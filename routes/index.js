var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var username;
var len;
var role;
var message;
/* GET home page. */
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
    if (err)
    { 
      throw err;
    }
    console.log("connected!");
  });
  
  username=req.body.username;
  role = req.body.role;
  //res.render('index', { title: 'Express' });
  if(role=='students')
  {
    con.query('SELECT name FROM `students` where `rollno` = ? ',[username],function(err,res,fields)
    {
      if(err) throw err;
      message = res;
    });
  }
  else if(role=='faculty')
  {
    con.query('SELECT name FROM `staffs` where `staffid` = ? ',[username],function(err,res,fields)
    {
      if(err) throw err;
      message = res;
      //len=res.Length;
    });
  }
  
    response.status(200).send(message);
  
});

module.exports = router;