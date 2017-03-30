console.log("Loading Clientside addProductsController.js");

app.controller('addProductsController', ['$scope', '$location', 'productFactory','companyFactory','orderFactory','userFactory','$routeParams', '$cookieStore', function ($scope, $location, productFactory, companyFactory, orderFactory, userFactory ,$routeParams, $cookieStore) {
  // Initialize Required Attributes
  var _this = this;
  $scope.errors = {};

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
  $scope.products = [];
  $scope.order = {};
  $scope.errors = [];

  userFactory.findUser($cookieStore.get('user_id'),function(user){
    console.log('returned from user factory with found user',user);
    $scope.user = user;
  });

  companyFactory.findCompany($routeParams.company_id,function(company){
    console.log('returned from the controller with the company',company.data);
    $scope.company = company.data;
  });

  $scope.start = function(){
    console.log('you clicked Add to order with this product',$scope._product);
    // $scope.products.push($scope.order.product)
    if($scope._product === undefined){
      console.log('did not select a product');
      $scope.errors = {message:'Please add a product'};
      return;
    }
    $scope.errors= {};
    var contains = false;
    if($scope.products.length === 0){
      $scope.products.push($scope._product);
    }
    for (var i = 0; i < $scope.products.length; i++) {
      if($scope._product == $scope.products[i]){
        contains = true;
      }
    }
    if(contains === false){
      $scope.products.push($scope._product);
    }
  };
  $scope.confirmOrder = function(){
    if ($scope.order.buyPrice === undefined || $scope.order.quantity === undefined){
      console.log('no products selected');
      $scope.errors = [{message:"Must have a product with buy price and quantity before confirming"}];
      return;
    }
    $scope.order.numProducts = 0;
    for (var i = 0; i < $scope.products.length; i++) {
      $scope.products[i].buyPrice = $scope.order.buyPrice[i];
      $scope.products[i].quantity = $scope.order.quantity[i];
      $scope.order.numProducts += $scope.order.quantity[i];
    }
    $scope.order.products = $scope.products;
    $scope.order.recipient = $scope.user.data;
    $scope.order.sender = $scope.company;
    $scope.order.received = false;
    delete $scope.order.buyPrice;
    delete $scope.order.quantity;
    console.log('clicked confirm order',$scope.order);
    orderFactory.create($scope.order,function(order_data){
      console.log('returned from order factory with created order',order_data.data);
      if(order_data.data.errors){
        console.log('there were errors creating order',order_data.data.errors);
        $scope.errors = order_data.data.errors;
      }
      $location.url('/userdashboard');

    });
  };

}]);
