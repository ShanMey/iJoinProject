var low = require('lowdb');
var storage = require('lowdb/browser');

var db = low('../data/users.json', {storage});

var newPicture = $('.picture-box').val();
var newAge = $('.age-box').val();
var newEye = $('.eye-box').val();
var newFirstName = $('.firstName-box').val();
var newLastName = $('.lastName-box').val();
var newCompany = $('.company-box').val();
var newEmail = $('.email-box').val();
var newPwd = $('.pwd-box').val();
var newPhone = $('.phone-box').val();
var newAddress = $('.address-box').val();

var changeData = function() {
  $('.btn').click(function() {
    for (userClass in user) {

    }


$(document).ready(changeData);
