console.log("Loading Clientside ordersController.js");


app.controller('ordersController', ['$scope', '$location', '$cookieStore', 'userFactory','orderFactory',function ($scope, $location, $cookieStore, userFactory,orderFactory) {


  // Initialize Required Attributes
  var _this = this
  $scope.orders = [];
  $scope.ordersReceived = [];
  $scope.sortType = 'name';
  $scope.sortReverse = true;
  $scope.search = '';


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
  $scope.show = function(order){
    $location.url('/orders/'+order._id);
  }
  orderFactory.indexNotReceived(function(orders_data){
    console.log('returned to the controller with the orders',orders_data.data);
    if(orders_data.data.errors){
      $scope.errors = orders_data.data.errors
    }
    $scope.orders = orders_data.data
  })
  orderFactory.indexReceived(function(orders_data){
    console.log('returned to the controller with the orders',orders_data.data);
    if(orders_data.data.errors){
      $scope.errors = orders_data.data.errors
    }
    $scope.ordersReceived = orders_data.data
  })
}]);
