console.log("Loading company.js");

app.factory('companyFactory', ['$http', function ($http) {

  // Initialize Required Attributes

  function CompanyFactory() {

    var _this = this;

    // -------------------------------------------------------------------------
    //                            Add Required Methods
    // -------------------------------------------------------------------------

    this.index = function(callback){
      console.log('got to the company factory, about to go to the server');
      $http.get('/companies').then(function(returned_data){
        console.log('returned from the server with all companies: ',returned_data.data);
        callback(returned_data);
      });
    };
    this.findCompany = function(company_id,callback){
      console.log('got to the factory with the company id ',company_id);
      $http.get('/companies/'+company_id).then(function(returned_data){
        console.log('returned form the server with the company', returned_data.data);
        callback(returned_data);
      });

    };
    this.create = function(company,callback){
      $http.post('/companies/',company).then(function(returned_data){
        console.log('returned form the server with the created company',returned_data.data);
        callback(returned_data);
      });
    };
    this.addProduct = function(product,callback){
      console.log('got to the companyFactory with product',product);
      $http.post('/companies/:company_id/addProduct',product).then(function(company_data){
        console.log('returned from the server with updated companay_data', company_data.data);
        if(company_data.data.errors){
          console.log('there were errors updating company products',company_data.data.errors);
        }
        callback(company_data);
      });
    };
  }
  return new CompanyFactory();
}]);
