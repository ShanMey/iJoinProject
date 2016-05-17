var low = require('lowdb');
var storage = require('lowdb/browser');

var db = low('../data/users.json', {storage});

var displayData = function() {
  $('.btn').click(function() {
    location.assign("Change Data.html");
  });
};

$(document).ready(displayData);
