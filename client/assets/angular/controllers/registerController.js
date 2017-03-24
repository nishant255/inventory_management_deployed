console.log("Loading Clientside registerController.js");

app.controller('registerController', ['$scope', '$location', 'userFactory', '$cookieStore', function ($scope, $location, userFactory, $cookieStore) {

  var _this = this;
  _this.newUser = {};
  _this.error_messages = [];


  // -------------------------------------------------------------------------
  //                            Create New User
  // -------------------------------------------------------------------------
  _this.createUser = function () {
    console.log(_this.error_messages);
    console.log("Error beofre server");
    userFactory.createUser(_this.newUser, function (dataFromServer) {
      if (dataFromServer.success === false) {
        console.log(dataFromServer.error_messages);
        _this.success = false;
        _this.error_messages = dataFromServer.error_messages;
      } else {
        if (dataFromServer.user.admin === 2) {
          console.log("Sending User to inventory");
          _this.newUser = {};
          $location.url('/inventory');
        } else {
          _this.newUser = {};
          $location.url('/userdashboard');
        }        
      }
    });
  };

  // -------------------------------------------------------------------------
  //                            Check Logged In User
  // -------------------------------------------------------------------------
  var CheckingUser = function () {
    if (!$cookieStore.get('logged-in')) {
      console.log("Not Logged In");
      // $location.url('/');
    } else {
      $location.url('/userdashboard');
    }
  };
  CheckingUser();


}]);
