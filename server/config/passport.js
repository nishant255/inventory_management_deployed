var JwtStrategy = require('passport-jwt').Strategy;

// load up the user model
var User = require('./../models/user_model');

module.exports = function(passport) {
  var opts = {};
  opts.secretOrKey = "INVENTORY_SECRET";
};
