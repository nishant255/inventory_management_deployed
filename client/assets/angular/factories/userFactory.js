console.log("Loading userFactory.js");

app.factory('userFactory', ['$http', '$cookieStore', function ($http, $cookieStore) {

  // Initialize Required Attributes

  function UserFactory() {

    var _this = this;
    var user = {};

    // -------------------------------------------------------------------------
    //                            Create User
    // -------------------------------------------------------------------------
    _this.createUser = function (newUser, callback) {
      $http.post('/user', newUser).then(function (dataFromServer) {
        console.log("User from Server");
        console.log(dataFromServer);
        user = dataFromServer.data;
        console.log(user);
        if (user.success){
          $cookieStore.put('logged-in', true);
          $cookieStore.put('user_id', user.user._id);
        }
        if (typeof(callback) == 'function') {
          callback(user);
        }
      });
    };

    // -------------------------------------------------------------------------
    //                            Login User
    // -------------------------------------------------------------------------
    _this.login = function (existingUser, callback) {
      $http.post('/user_login', existingUser).then(function (dataFromServer) {
        console.log("User from Server");
        console.log(dataFromServer);
        user = dataFromServer.data;
        if (user.success) {
          $cookieStore.put('logged-in', true);
          $cookieStore.put('user_id', user.user._id);
          console.log("Logged user in factory");
        }
        if (typeof(callback) == 'function') {
          callback(user);
        }
      });
    };

    // -------------------------------------------------------------------------
    //                            Logout User
    // -------------------------------------------------------------------------
    _this.logout = function (callback) {
      console.log("Logging Out");
      user = {};
      $cookieStore.remove('logged-in');
      $cookieStore.remove('user_id');
      if (typeof(callback) === 'function') {
        callback("Successfully Logged Out");
      }
    };

    // -------------------------------------------------------------------------
    //                           Find User
    // -------------------------------------------------------------------------
    _this.findUser = function(user_id,callback){
      $http.get('/user/'+user_id).then(function(user_data){
        console.log('returned from the server controller with the user_data',user_data.data);
        callback(user_data);
      });
    };


    // -------------------------------------------------------------------------
    //                            Send Logged In User to Controller
    // -------------------------------------------------------------------------
    _this.getUser = function (callback) {
      user_id = $cookieStore.get('user_id');
      $http.get('/user/getUser/id/'+user_id).then( function(dataFromServer) {
        console.log(dataFromServer.data);
        user = dataFromServer.data;
        if (typeof(callback) === 'function') {
          callback(user);
        }
      });
    };

    // -------------------------------------------------------------------------
    //                            Make Admin
    // -------------------------------------------------------------------------
    _this.makeAdmin = function (userId, callback) {
      $http.get('/user/makeAdmin/'+userId).then( function (dataFromServer) {
        console.log(dataFromServer.data);
        if (typeof(callback) === 'function') {
          callback(dataFromServer.data);
        }
      });
    };

    // -------------------------------------------------------------------------
    //                            Remove Admin
    // -------------------------------------------------------------------------
    _this.removeAdmin = function (userId, callback) {
      $http.get('/user/removeAdmin/'+userId).then( function (dataFromServer) {
        console.log(dataFromServer.data);
        if (typeof(callback) === 'function') {
          callback(dataFromServer.data);
        }
      });
    };

    // -------------------------------------------------------------------------
    //                            Get All Users
    // -------------------------------------------------------------------------
    _this.getAllUser = function (callback) {
      $http.get('/users').then(function (dataFromServer) {
        console.log(dataFromServer.data);
        users = dataFromServer.data;
        if (typeof(callback) === 'function') {
          callback(users);
        }
      });
    };

  }
  return new UserFactory();
}]);
