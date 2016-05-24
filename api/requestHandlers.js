var http = require('http');
var fs = require('fs');
var url = require("url");
var _ = require('lodash');
var low = require('lowdb');
low.autosave = false;
var storage = require('lowdb/file-async');
var util = require('util');
var express = require('express');
var dialog = require('dialog');
//var jwt = require('jwt-simple');
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
    dialog.info("Please enter correct email","Email not found",function(err){
      if(!err) {
        console.log("User Pressed Ok.");
      }
    } );
  }
  else {
//    console.log(userArray);
    if (_.isMatch(userArray, {'password': password})) {
//      console.log("match!");
//      response.writeHead(200, {"Content-Type": "text/plain"});
//      response.write("Welcome, " + userArray.name['first']
//        + " " + userArray.name['last'] + "!\n");
//      response.write("Balance: " + userArray['balance'] + "\n");
//      response.write("Email: " + userArray['email'] + "\n");
//      response.write("Password: " + userArray['password'] + "\n");
//      response.write("Age: " + userArray['age'] + "\n");
//      response.write("Eye Color: " + userArray['eyeColor'] + "\n");
//      response.write("Company: " + userArray['company'] + "\n");
//      response.write("Phone: " + userArray['phone'] + "\n");
//      response.write("Address: " + userArray['address'] + "\n");
//      response.end();
//      var token = jwt.encode(userArray, "iJoinDevTest");
      var greeting = "Welcome, " + userArray.name['first'] + " ";
      greeting += userArray.name['last'] + "!";
      var body = '<html>'+
        '<head>'+
        '<meta http-equiv="Content-Type" content="text/html; ' +
        'charset=UTF=8" />' +
        '</head>' +
        '<body>' +
        '<h1 id = "logo">ACME Financial</h1>' +
        '<p id="welcome">' + greeting + '</p>' +
        '<p id="balance">Your balance is: ' + userArray['balance'] + '</p>' +
        '<p id="email">Email: ' + userArray['email'] + '</p>' +
        '<p id="password">Password: ' + userArray['password'] + '</p>' +
        '<p id="age">Age: ' + userArray['age'] + '</p>' +
        '<p id="eyeColor">Eye Color: ' + userArray['eyeColor'] + '</p>' +
        '<p id="company">Company: ' + userArray['company'] + '</p>' +
        '<p id="phone">Phone: ' + userArray['phone'] + '</p>' +
        '<p id="address">Address: ' + userArray['address'] + '</p>' +
        '<p id=updatePrompt>To change your data, press Update Info<br><p>' +
        '<form action="./client/update.html" method="post" enctype="text/plain">'+
        '<input type="submit" value="Update Info" />'+
        '</form>'+
        '</body>'+
        '</html>';

        var parsedBody = body;

//        response.setHeader('Set-Cookie', userArray);
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(parsedBody);
        response.end();
        fs.writeFile("./data/tmp.json", userArray['email'], function(err){
          if(err){
            console.log("Temp file write error.")
          }
        });
//      console.log("userArray:" + userArray);
    }
    else {
//      console.log("No match.");
      dialog.info("Please log in again","Password Does Not Match",function(err){
        if(!err) {
          console.log("User pressed OK");
        }
      });
    }
  }

}

function update(response,postData){
//  console.log("Request handler 'update' was called.");
//  console.log("\nresponse headers:" + response.headers);
//  console.log("\npostData headers:" + postData.headers);
  var db = low("./data/users.json", {storage});
  var userEmail = "";
  var userChanges = "";

  fs.readFile("./data/tmp.json", {encoding:'utf8'},function(err, userEmail){
    if (err) {
      console.log("Error opening temp file");
    }
    if (userEmail === "") {
      console.log("Error");
    }
    else {
      var userArray = _.find(db.object, _.matches({'email': userEmail}));
    }
  fs.readfile(".data/tmp2.json", {encoding: 'utf8'}, function (err, userChanges){
    if (err) {
      console.log("Error opening temp file");
    }
    if (userChanges === "") {
      console.log("Error");
    }
    else {
      for (attribute in userChanges){
        if (userChanges.attribute !== ""){
          db(attribute)
            .chain()
            .find({email: userEmail})
            .assign({attribute: userChanges.attribute})
            .value();
        }
      }
    }
  })
  });

//  var userArray = jwt.decode(token, "iJoinDevTest");
};


exports.start = start;
exports.upload = upload;
exports.update = update;
