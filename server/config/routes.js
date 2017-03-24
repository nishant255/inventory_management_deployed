console.log("Loading routes.js");
var path         = require('path'),
    companies = require('./../controllers/companies.js');
    userController = require('./../controllers/userController.js');
    products = require('./../controllers/products.js');
    orders = require('./../controllers/orders.js');


  // Create User Route



module.exports = function (app) {

  app.get('/cool', function(request, response) {
  response.send(cool());
});
  app.get('/companies/:company_id', companies.findCompany);
  app.post('/companies/:company_id/addProduct', companies.addProduct);
  app.get('/companies/:id', companies.show);
  app.get('/companies', companies.index);
  app.post('/companies', companies.create);

  app.get('/user/:id', userController.getUser);
  app.get('/users', userController.getAllUser);
  app.get('/user/getUser/:id', userController.getUser);
  app.get('/user/makeAdmin/:id', userController.makeAdmin);
  app.get('/user/removeAdmin/:id', userController.removeAdmin);
  app.post('/user', userController.createUser);
  app.post('/user_login', userController.loginUser);

  app.get('/products/name/:name', products.findByName);
  app.post('/products/receiveOrder', products.receiveOrder);
  app.post('/products/update', products.update);
  app.post('/products/name/:name', products.setSellPriceToZero);
  app.get('/products/withSellPrice', products.indexWithSellPrice);
  app.get('/products/forSale', products.indexforSale);
  app.get('/products/:id', products.show);
  app.get('/products', products.index);
  app.post('/products', products.create);

  app.get('/orders/notReceived', orders.indexNotReceived);
  app.get('/orders/Received', orders.indexReceived);
  app.get('/orders/:id', orders.show);
  app.get('/orders', orders.index);
  app.post('/orders/receive/:id', orders.receive);
  app.post('/orders', orders.create);
};
