console.log("Loading Clientside orderController.js");

app.controller('orderController', ['$scope', '$location', 'orderFactory', '$cookieStore','$routeParams','userFactory','productFactory',function ($scope, $location, orderFactory, $cookieStore,$routeParams,userFactory,productFactory) {

  // Initialize Required Attributes
  var _this = this;
  // $scope.order;


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

  userFactory.findUser($cookieStore.get('user_id'),function(user_data){
    console.log('returned from the userFactory with the user_data',user_data.data);
    $scope.user = user_data.data;
  });

  $scope.receiveOrder = function(){
    console.log('clicked recieve order');
    console.log('user logged in is ',$scope.user);
    console.log('order is ',$scope.order);
    orderFactory.receiveOrder($scope.order,$scope.user,function(order_data){
      console.log('returned from the factory with the updated order message',order_data.data);
      if (order_data.data.errors){
        console.log('there were errors',$scope.errors = order_data.data.errors);
      } else {
        //need to update products with our new products
        productFactory.receiveOrder(order_data.data,function(result_data){
          console.log('returned from the factory with the result data');
        });
        $location.url('/inventory');
      }
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

  // -------------------------------------------------------------------------
  //                            Add Required Methods
  // -------------------------------------------------------------------------
  orderFactory.findOrder($routeParams.id, function(returned_data){
    $scope.order = returned_data.data;
  });
}]);
