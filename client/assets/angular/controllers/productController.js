console.log("Loading Clientside productController.js");

app.controller('productController', ['$scope', '$location', 'productFactory','$cookieStore','$routeParams', 'userFactory',function ($scope, $location, productFactory, $cookieStore,$routeParams, userFactory) {

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
  //                            Add Required Methods
  // -------------------------------------------------------------------------
  productFactory.findProduct($routeParams.id, function(returned_data){
    $scope.product = returned_data;
  });
}]);
