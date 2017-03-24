console.log("Loading Clientside confirmOrderController.js");

app.controller('confirmOrderController', ['$scope', '$location', 'orderFactory', function ($scope, $location, orderFactory) {

  // Initialize Required Attributes
  $scope.order;

  // -------------------------------------------------------------------------
  //                            Add Required Methods
  // -------------------------------------------------------------------------
  orderFactory.getOrder(function(order){
    $scope.order = order
  })

}]);
