var http = require('http');
var fs = require('fs');
var url = require("url");
var _ = require('lodash');
var low = require('lowdb');
low.autosave = false;
var storage = require('lowdb/file-async');
var util = require('util');
var express = require('express');
//var basicAuth = require('basic-auth-connect');
//var app = express();
var db = low("./data/users.json", {storage});
//console.log(db.object);

function start(response,postData){
//  console.log("Request handler 'start' was called.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; ' +
    'charset=UTF=8" />' +
    '</head>' +
    '<body>' +
    '<h1 id = "logo">ACME Financial</h1>' +
    '<form action="/upload" method="post" enctype="text/plain">'+
    'Email:<br><input type="text" name= "email"><br>' +
    'Password:<br><input type="password" name = "password"><br>' +
    '<input type="submit" value="Log In" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response,postData){
//  console.log("Request handler 'upload' was called.");
  var db = low("./data/users.json", {storage});
//  console.log(db.object);
  postData = postData.replace("email=","");
  postData = postData.replace("password=","");
//  console.log(postData);
  var pDArray = postData.split("\r\n");
//  console.log(pDArray);
  var email = pDArray[0];
//  console.log(email);
  var password = pDArray[1];
//  console.log(password);

  var userArray = _.find(db.object, _.matches({'email': email}));
  if (typeof userArray === "undefined") {
    window.alert("Email not found.  Please enter correct email");
  }
  else {
    console.log(userArray);
    if (_.isMatch(userArray, {'password': password})) {
      console.log("match!");
    }
    else {
      console.log("No match.");
    }
  }

  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("email: " + email + "\n");
  response.write("password: " + password);
  response.end();
}

exports.start = start;
exports.upload = upload;
