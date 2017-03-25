console.log("Loading Clientside dashboardController.js");

app.controller('dashboardController', ['$scope', '$location', 'productFactory', 'userFactory', 'orderFactory', '$cookieStore',  function ($scope, $location, productFactory, userFactory, orderFactory, $cookieStore) {

  var _this = this;
  $scope.orders = [];
  $scope.products = [];
  $scope.isReversed = true;
  $scope.totalvalue = 0;
  $scope.message = {};
  // _this.currentUser = {};

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

  orderFactory.getMessage(function(message){
    console.log('recieved success message',message);
    $scope.message = message;
  });

  productFactory.getvalue(function(value){
    $scope.totalvalue = value;
  });

  orderFactory.indexNotReceived(function(orders){
    $scope.orders = orders.data;
  });
  productFactory.findAllProductsWithSellPrice(function(products){
    $scope.products = products.data;
  });
}]);
