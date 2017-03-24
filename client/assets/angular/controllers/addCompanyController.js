console.log("Loading Clientside addCompanyController.js");

app.controller('addCompanyController', ['$scope', '$location', 'productFactory','companyFactory', '$cookieStore', 'userFactory' ,function ($scope, $location, productFactory, companyFactory, $cookieStore, userFactory) {


  var self = this;
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
  //                            Create Company
  // -------------------------------------------------------------------------

  this.create = function(){
    console.log('you clicked create company',$scope.company);
    companyFactory.create($scope.company,function(company){
      console.log('returned to the addCompanyController with created company',company.data);
      $location.url('/');
    });
  };

}]);
