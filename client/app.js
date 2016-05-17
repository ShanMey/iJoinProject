var low = require('lowdb');
var storage = require('lowdb/browser');

var db = low('../data/users.json', {storage});

var validateId = function(emailLogin,pwdLogin) {

  var userObj = _.filter(db, _.matches({'email': emailLogin}));

    if (_.isMatch(userObj, {'password': pwdLogin})) {
    verified = true;
    return userObj;
  }
  else {
    console.log("Invalid email/password combination: please reenter data.");
    return false;
  }
};

var main = function() {
  $('.btn').click(function() {
      var email = $('.emailLogin-box').val();
      var pwd = $('.pwd-box').val();
      if (email.length === 0 || pwd.length === 0) {
        console.log("Email and Password needed.");
        console.log("Please enter both then press Submit again.");
      }
    var user = validateId(email,pwd);
    if (user === false) {
      console.log("Error");
    }
    else {
      location.assign("Display Data.html");
    }
  })
};

$(document).ready(main);
