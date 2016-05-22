var http = require("http");
var fs = require("fs");
var url = require("url");
var low = require('lowdb');
low.autosave = false;
var storage = require('lowdb/file-async');
var express = require("express");
//var bodyParser = require("body-parser");

var db = low("./data/users.json", {storage});

var app = express();
//app.use(bodyParser());
http.createServer(app);
//app.get('/', function (req, res){
//    fs.readFile('./client/index.html', function (err, data){
//      if (err){
//        res.writeHead(404);
//        res.end(JSON.stringify(err));
//        return;
//      }
//      res.writeHead(200);
//      res.end(data);
//    });
//});
app.get('/', function(req,res){
  var response = '<form method=POST">'+
    'Email:      <input type="text" name= "email"><br>' +
    'Password: <input type="text" name = "password"><br>' +
    '<input type="submit" value="Submit"></form>';
  res.send(response);
  console.log('get',req.body.email,req.body.password);
});

// app.get('/', function(req, res) {
//  var email = "";
//  var password = "";
//  var response = '<form method="POST">' +
//    'Email Address: <input type="text" name="email"><br>' +
//    'Password: <input type = "text" name="password"><br>' +
//    '<input tres.end(./client)m>';
//  if (email !== "" && password !== ""){
//    var passed = testUser(email, password);
//    if (passed){
// res.something
//    } else {
//res.somethingelse
//    }
//  }
//});
// app.use(express.static('./client'));

// app.listen(8888);



console.log(db.object);

app.listen(8888);
