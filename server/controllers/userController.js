var decon = require('./../../debugLog.js');
decon.log("Loading Serverside userController.js");

var mongoose = require('mongoose'),
    User = mongoose.model('User');

function UserController() {

  var _this = this;
  var error_messages = [];
  var success = true;

  // -------------------------------------------------------------------------
  //                      Create or Return Existing User
  // -------------------------------------------------------------------------
  _this.createUser = function (req, res) {
    decon.log("Creating User");
    decon.log(req.body);
    error_messages = [];
    if (!req.body.first_name) {
      decon.log("No First Name");
      error_messages.push("First Name is Required");
      success = false;
    }
    if (req.body.first_name.length < 2) {
      decon.log("First Name has to be 2 or more Characters");
      error_messages.push("First Name has to be 2 or more Characters");
      success = false;
    }
    if (!req.body.last_name) {
      decon.log("No Last Name");
      error_messages.push("Last Name is Required");
      success = false;
    }
    if (req.body.last_name.length < 2) {
      decon.log("Last Name has to be 2 or more Characters");
      error_messages.push("Last Name has to be 2 or more Characters");
      success = false;
    }
    if (!req.body.email) {
      decon.log("No email");
      error_messages.push("Email is Required");
      success = false;
    }
    if (req.body.email.length < 5) {
      decon.log("Email has to be 5 or more Characters");
      error_messages.push("Email has to be 5 or more Characters");
      success = false;
    }
    if (!req.body.password) {
      decon.log("No password");
      error_messages.push("Password is Required");
      success = false;
    }
    if (req.body.password.length < 4) {
      decon.log("Password has to be 4 or more Characters");
      error_messages.push("Password has to be 4 or more Characters");
      success = false;
    }
    if (!req.body.phone_number) {
      decon.log("No Phone Number");
      error_messages.push("Phone Number is Required");
      success = false;
    }
    if (!/^\d+$/.test(req.body.phone_number)) {
      decon.log("Phone Number Should Contain only Digits");
      error_messages.push("Phone Number can Contain Only Numbers");
      success = false;
    }
    if (String(req.body.phone_number).length !== 10) {
      decon.log("Phone Number has to be 10 Digits");
      decon.log(typeof(req.body.phone_number));
      decon.log(req.body.phone_number.length);
      decon.log(req.body.phone_number);
      error_messages.push("Phone Number has to be 10 Digits");
      success = false;
    }
    if (!success) {
      res.json({success: success, error_messages: error_messages});
      success = true;
      return;
    }
    var newCreatedUser = new User({
      first_name: req.body.first_name.toLowerCase(),
      last_name: req.body.last_name.toLowerCase(),
      email: req.body.email.toLowerCase(),
      phone_number: req.body.phone_number,
      password: req.body.password,
      admin: 2
    });
    newCreatedUser.save(function (err, user) {
      if (err) {
        decon.log("Email already Registered");
        error_messages.push("Email Already Registered! Please Login.");
        res.json({success: success, error_messages: error_messages});
        decon.log(err);
        throw err;
      }
      success = true;
      res.json({success: success, user: user});
    });
  };

  // -------------------------------------------------------------------------
  //                      Create or Return Existing User
  // -------------------------------------------------------------------------
  _this.loginUser = function (req, res) {
    decon.log("Logging User");
    decon.log(req.body);
    error_messages = [];
    if (!req.body.email) {
      decon.log("No email");
      error_messages.push("Email is Required");
      success = false;
    }
    if (req.body.email.length < 5) {
      decon.log("Email has to be 5 or more Characters");
      error_messages.push("Email has to be 5 or more Characters");
      success = false;
    }
    if (!req.body.password) {
      decon.log("No password");
      error_messages.push("Password is Required");
      success = false;
    }
    if (req.body.password.length < 4) {
      decon.log("Password has to be 4 or more Characters");
      error_messages.push("Password has to be 4 or more Characters");
      success = false;
    }
    if (!success) {
      res.json({success: success, error_messages: error_messages});
      success = true;
      return;
    }
    User.findOne({
      email: req.body.email
    }, function (err, user) {
      if (err) {
        decon.log(err);
        throw err;
      }
      if (!user) {
            error_messages.push("Invalid Email or Password.");
            res.json({success: success, error_messages: error_messages});
            success = true;
      } else {
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            // var token = jwt.en
            success = true;
            res.json({success: success, user:user});
          } else {
            error_messages.push("Invalid Email or Password.");
            res.json({success: success, error_messages: error_messages});
            success = true;
          }
        });
      }
    });
  };

  var createAdminUser = function () {
    User.findOne({email:"a@admin.com"}, function (err, user) {
      if (err) {
        decon.log(err);
      }
      if (!user) {
        console.log("Super Admin Not Found! Creating one at email: a@admin.com pass: asdf");
        var newAdmin = new User({
          first_name: 'admin',
          last_name: 'admin',
          email: 'a@admin.com',
          phone_number: '5106009412',
          password: 'asdf',
          admin: 0
        });
        newAdmin.save(function (err, user) {
          if (err) {
            decon.log("Email already Registered");
            error_messages.push("Email Already Registered! Please Login.");
            res.json({success: false, error_messages: error_messages});
            decon.log(err);
            throw err;
          }
        });
      } else {
        console.log("Super Admin Available @ email: a@admin.com pass: asdf");
      }
    });

    User.findOne({email:"aa@admin.com"}, function (err, user) {
      if (err) {
        decon.log(err);
      }
      if (!user) {
        console.log("Admin Not Found! Creating one at email: aa@admin.com pass: asdf");
        var newAdmin = new User({
          first_name: 'admin',
          last_name: 'admin',
          email: 'aa@admin.com',
          phone_number: '5106009412',
          password: 'asdf',
          admin: 1
        });
        newAdmin.save(function (err, user) {
          if (err) {
            decon.log("Email already Registered");
            error_messages.push("Email Already Registered! Please Login.");
            res.json({success: false, error_messages: error_messages});
            decon.log(err);
            throw err;
          }
        });
      } else {
        console.log("Admin Available @ email: aa@admin.com pass: asdf");
      }
    });
  };
  createAdminUser();

  // -------------------------------------------------------------------------
  //                           Make Admin
  // -------------------------------------------------------------------------
  _this.makeAdmin = function (req, res) {
    decon.log(req.params.id);
    User.findOne({_id:req.params.id}, function (err, user) {
      if (err) {
        decon.log("Error While Find User for Admin");
        decon.log(err);
      }
      decon.log(user);
      user.admin = 1;
      user.save(function (err, user) {
        if (err) {
          decon.log("Error While Find User for Admin");
          decon.log(err);
        }
        decon.log("successfully made Admin", user);
        res.json(user);
      });
    });
  };
  // -------------------------------------------------------------------------
  //                           Remove Admin
  // -------------------------------------------------------------------------
  _this.removeAdmin = function (req, res) {
    decon.log(req.params.id);
    User.findOne({_id:req.params.id}, function (err, user) {
      if (err) {
        decon.log("Error While Find User for Admin");
        decon.log(err);
      }
      decon.log(user);
      user.admin = 2;
      user.save(function (err, user) {
        if (err) {
          decon.log("Error While Find User for Admin");
          decon.log(err);
        }
        decon.log("successfully made Admin", user);
        res.json(user);
      });
    });
  };

  // -------------------------------------------------------------------------
  //                           Give One User
  // -------------------------------------------------------------------------
  _this.getUserUsingID = function (req, res) {
    User.findOne({_id: req.params.id}, function (err, user) {
      if (err) {
        decon.log("Error While Find Single User");
        decon.log(err);
      } else {
        res.json(user);
      }
    });
  };
  // -------------------------------------------------------------------------
  //                           Give One User Using ID
  // -------------------------------------------------------------------------
  _this.getUserUsingEmail = function (req, res) {
    User.findOne({email: req.params.email}, function (err, user) {
      if (err) {
        decon.log("Error While Find Single User");
        decon.log(err);
      } else {
        res.json(user);
      }
    });
  };

  // -------------------------------------------------------------------------
  //                           Get all the users
  // -------------------------------------------------------------------------
  _this.getAllUser = function (req, res) {
    User.find({}, function (err, users) {
      if (err) {
        decon.log("Error While finding all the users");
        decon.log(err);
      } else {
        res.json(users);
      }
    });
  };
  // -------------------------------------------------------------------------
  //                           Get a user
  // -------------------------------------------------------------------------

  _this.getUser = function(req,res){
    decon.log('got to the server controller with user id',req.params.id);
    User.findById(req.params.id,function(err,result){
      if(err){
        decon.log('there was an error finding user',err);
        res.json(err);
      } else {
        decon.log('successfully found user',result);
        res.json(result);
      }
    });
  };



}

module.exports = new UserController();
