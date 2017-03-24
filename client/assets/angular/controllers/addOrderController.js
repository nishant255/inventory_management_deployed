console.log("Loading Clientside addOrderController.js");

app.controller('addOrderController', ['$scope', '$location', 'productFactory','companyFactory' , '$cookieStore', 'userFactory', function ($scope, $location, productFactory, companyFactory, $cookieStore, userFactory) {

  var _this = this
  // Initialize Required Attributes
  $scope.message = {}
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
  $scope.companies = []
  companyFactory.index(function(companies){
    console.log('returned from the controller with the companies',companies.data);
    $scope.companies = companies.data
  })
  $scope.start = function(){
    if(!$scope.order){
      $scope.message = {message:'Please select a company'}
      return
    }
    console.log('got to addOrderController with company',$scope.order);
    $location.url(`/add_order/${$scope.order.company._id}`)
  }
}]);
