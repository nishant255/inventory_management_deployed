console.log("Loading orderFactory.js");

app.factory('orderFactory', ['$http', function ($http) {

  // Initialize Required Attributes

  function OrderFactory() {

    var _this = this;
    var order = {};
    var message = {};

    // -------------------------------------------------------------------------
    //                            Add Required Methods
    // -------------------------------------------------------------------------

    this.index = function(callback){
      console.log('got to the order factory, about to go to the server');
      $http.get('/orders').then(function(returned_data){
        console.log('returned from the server with all orders: ',returned_data.data);
        callback(returned_data);
      });
    };
    this.getMessage = function(callback){
      if (message != {}){
        callback(message);
        message = {};
      }
    };
    this.indexNotReceived = function(callback){
      console.log('got to the order factory, about to go to the server');
      $http.get('/orders/notReceived').then(function(returned_data){
        console.log('returned from the server with all orders: ',returned_data.data);
        callback(returned_data);
      });
    };
    this.indexReceived = function(callback){
      console.log('got to the order factory, about to go to the server');
      $http.get('/orders/Received').then(function(returned_data){
        console.log('returned from the server with all orders: ',returned_data.data);
        callback(returned_data);
      });
    };
    this.findOrder = function(order_id,callback){
      console.log('got to the factory with the order id ',order_id);
      $http.get('/orders/'+order_id).then(function(returned_data){
        console.log('returned from server with order: ', returned_data.data);
        callback(returned_data);
      });
    };
    this.create = function(order,callback){
      $http.post('/orders/',order).then(function(returned_data){
        message = {};
        console.log('returned form the server with the created company',returned_data.data);
        message = {message:'Successfully created order!'};
        callback(returned_data);
      });
    };
    this.giveOrder = function(order_data){
      console.log('got to order factory with order',order_data);
      order = order_data;
    };
    this.getOrder = function(callback){
      console.log('getting the order from the factory');
      callback(order);
    };
    this.receiveOrder = function(order,recipient,callback){
      console.log('got to the order factory with order, and recipient',order,recipient);
      $http.post('/orders/receive/' + order._id,recipient).then(function(returned_data){
        console.log('returned from the server with the updated order',returned_data.data);
        callback(returned_data);
      });
    };

  }
  return new OrderFactory();
}]);
