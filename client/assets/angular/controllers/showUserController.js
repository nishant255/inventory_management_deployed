console.log("Loading Clientside showUserController.js");

app.controller('showUserController', ['$scope', '$location', 'productFactory', 'userFactory', '$cookieStore', function ($scope, $location, productFactory, userFactory,$cookieStore) {

  // Initialize Required Attributes
  var _this = this;
  // -------------------------------------------------------------------------
  //                            Check Logged In User
  // -------------------------------------------------------------------------
  var CheckingUser = function () {
    if (!$cookieStore.get('logged-in')) {
      console.log("Not Logged In");
      $location.url('/');
    } else {
      console.log("logged in");
    }
  };
  CheckingUser();

  // -------------------------------------------------------------------------
  //                            Log Out User
  // -------------------------------------------------------------------------
  _this.logout = function () {
    userFactory.logout(function (factoryResponse) {
      console.log(factoryResponse);
    });
  };

  // -------------------------------------------------------------------------
  //                            Get CurrentUser
  // -------------------------------------------------------------------------
  var getCurrentUser = function () {
    userFactory.getUser(function (currentUser) {
      _this.currentUser = currentUser;
      if (_this.currentUser.admin === 2) {
        $location.url('/inventory');
      }
    });
  };
  getCurrentUser();
  // -------------------------------------------------------------------------
  //                            Get all the Users
  // -------------------------------------------------------------------------
  var getAllUser = function () {
    userFactory.getAllUser(function (usersFromServer) {
      _this.users = usersFromServer;
    });
  };
  getAllUser();

  // -------------------------------------------------------------------------
  //                            Make Admin
  // -------------------------------------------------------------------------
  _this.makeAdmin = function (userId) {
    console.log(userId);
    userFactory.makeAdmin(userId, function (factoryResponse) {
      console.log(factoryResponse);
      getAllUser();
    });
  };

  // -------------------------------------------------------------------------
  //                            Remove Admin
  // -------------------------------------------------------------------------
  _this.removeAdmin = function (userId) {
    console.log(userId);
    userFactory.removeAdmin(userId, function (factoryResponse) {
      console.log(factoryResponse);
      getAllUser();
    });
  };

  // -------------------------------------------------------------------------
  //                            Log Out User
  // -------------------------------------------------------------------------
  _this.logout = function () {
    userFactory.logout(function (factoryResponse) {
      console.log(factoryResponse);
    });
  };
}]);

// -------------------------------------------------------------------------
//                            Filter for Title Case
// -------------------------------------------------------------------------

app.filter('titleCase', function() {
  return function(input) {
    input = input || '';
    return input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  };
});

// -------------------------------------------------------------------------
//                            Filter for Phone Number
// -------------------------------------------------------------------------

app.filter('tel', function () {
    return function (tel) {
        if (!tel) { return ''; }

        var value = tel.toString().trim().replace(/^\+/, '');

        if (value.match(/[^0-9]/)) {
            return tel;
        }

        var country, city, number;

        switch (value.length) {
            case 10: // +1PPP####### -> C (PPP) ###-####
                country = 1;
                city = value.slice(0, 3);
                number = value.slice(3);
                break;

            case 11: // +CPPP####### -> CCC (PP) ###-####
                country = value[0];
                city = value.slice(1, 4);
                number = value.slice(4);
                break;

            case 12: // +CCCPP####### -> CCC (PP) ###-####
                country = value.slice(0, 3);
                city = value.slice(3, 5);
                number = value.slice(5);
                break;

            default:
                return tel;
        }

        if (country == 1) {
            country = "";
        }

        number = number.slice(0, 3) + '-' + number.slice(3);

        return (country + " (" + city + ") " + number).trim();
    };
});
