var http = require("http");
var _ = require('lodash');
var low = require('lowdb');
low.autosave = false;
var storage = require('lowdb/file-async');

function start(response,postData){
  console.log("Request handler 'start' was called.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; ' +
    'charset=UTF=8" />' +
    '</head>' +
    '<body>' +
    '<h1 id = "logo">ACME Financial</h1>' +
    '<form action="/upload" method="post">'+
    'Email:      <input type="text" name= "email"><br>' +
    'Password: <input type="text" name = "password"><br>' +
    '<input type="submit" value="Log In" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response,postData){
  console.log("Request handler 'upload' was called.");
  var db = low("./data/users.json", {storage});
  var pDArray = postData.split("&");
  var email = pDArray[0];
  for (var i = 0;i<email.length;i++) {
    if (email[i] === '=') {
      email = email.substr(i+1);
    }
  }
  var password = pDArray[1];
  for (var i = 0;i<password.length;i++) {
    if (password[i] === '=') {
      password = password.substr(i+1);
    }
  }

  var userArray = null;
  userArray = _.find(db, _.matches({'email': email}));
  if (userArray === null) {
    console.log("Email not found.  Please enter correct email");
  }
  else {
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
