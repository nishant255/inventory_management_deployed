console.log("Loading productFactory.js");

app.factory('productFactory', ['$http', function ($http) {

  // Initialize Required Attributes

  function ProductFactory() {

    var _this = this;

    // -------------------------------------------------------------------------
    //                            Add Required Methods
    // -------------------------------------------------------------------------
    this.index = function(callback){
      console.log('got to the product factory, about to go to the server');
      $http.get('/products').then(function(returned_data){
        console.log('returned from the server with all products: ',returned_data.data);
        callback(returned_data);
      })
    }
    this.findProduct = function(product_id,callback){
      console.log('got to the factory with the order id ',product_id);
      $http.get('/products/', product_id).then(function(returned_data){
        console.log('returned from server with product: ', returned_data.data);
        callback(returned_data)
      })
    }
    this.create = function(product,company,callback){
      product._company = company
      product.received = false;
      $http.post('/products/',product,company).then(function(returned_data){
        console.log('returned form the server with the created company',returned_data.data);
        callback(returned_data);
        if (returned_data.data.errors) {
          console.log('there was an error',returned_data.data.errors);
        }
      })
    }
    this.receiveOrder = function(order,callback){
      console.log('got to product factory method receiveOrder with order',order);
      $http.post('/products/receiveOrder',order).then(function(returned_data){
        console.log('got back from the server with the returned data',returned_data.data);
      })
    }
    this.findAllProductsWithSellPrice = function(callback){
      console.log('got to the product Factory and about to get all products with sellprices');
      $http.get('/products/withSellPrice').then(function(returned_data){
        console.log('back from the server with products with sellprices',returned_data.data);
        if(returned_data.data.errors){
          console.log('there were errors',returned_data.data.errors);
        }
        callback(returned_data)
      })
    }
    this.update = function(product,callback){
      console.log('got to the factory with the product',product);
      $http.post('/products/update',product).then(function(returned_data){
        console.log('got back from the server with returned_data',returned_data.data);
        callback(returned_data)
      })
    }
    this.findAllProductsforSale = function(callback){
      console.log('got to the product Factory and about to get all products  for sale');
      $http.get('/products/forSale').then(function(returned_data){
        console.log('back from the server with products with sellprices',returned_data.data);
        if(returned_data.data.errors){
          console.log('there were errors',returned_data.data.errors);
        }
        callback(returned_data)
      })
    }
    this.getvalue = function(callback){
      console.log('got to the product Factory and about to get all products  for sale');
      $http.get('/products/forSale').then(function(returned_data){
        console.log('back from the server with products with sellprices',returned_data.data);
        if(returned_data.data.errors){
          console.log('there were errors',returned_data.data.errors);
        }
        var sum = 0
        for (var i = 0; i < returned_data.data.length; i++) {
          sum += (returned_data.data[i].quantity*returned_data.data[i].sellPrice)
          console.log('sum is' ,sum);
        }
        callback(sum)
      })
    }

  }
  return new ProductFactory();
}]);
