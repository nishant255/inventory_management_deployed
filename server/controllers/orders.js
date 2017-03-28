var decon = require('./../../debugLog.js');
decon.log("Loading Serverside orders.js");

var mongoose = require('mongoose'),
    Order = mongoose.model('Order');

function OrdersController() {

  var _this = this;

  // -------------------------------------------------------------------------
  //                           My Controller Method
  // -------------------------------------------------------------------------
  _this.index = function(req, res){
    decon.log('got to the server controller and about to search for orders in DB');
    Order.find({},function(err,result){
      if(err){
        decon.log('there was an error finding orders',err);
        res.json(err);
      } else {
        decon.log('successfully found orders', result);
        res.json(result);
      }
    });
  };
  _this.indexNotReceived = function(req, res){
    decon.log('got to the server controller and about to search for orders in DB');
    Order.find({received:false},function(err,result){
      if(err){
        decon.log('there was an error finding orders',err);
        res.json(err);
      } else {
        decon.log('successfully found orders', result);
        res.json(result);
      }
    });
  };
  _this.indexReceived = function(req, res){
    decon.log('got to the server controller and about to search for orders in DB');
    Order.find({received:true},function(err,result){
      if(err){
        decon.log('there was an error finding orders',err);
        res.json(err);
      } else {
        decon.log('successfully found orders', result);
        res.json(result);
      }
    });
  };
  _this.create = function (req, res) {
    decon.log('got to the server controller with order data ',req.body);
    Order.create(req.body,function(err,result){
      if(err){
        decon.log('there was an error creating order ',err);
        res.json(err);
      } else {
        decon.log('successfully created order ',result.recipient.data);
        res.json(result);
      }
    });
  };
  _this.show = function(req,res){
    decon.log('got to server controller with order data',req.params);
    Order.findById(req.params.id, function(err, result){
      if (err){
        decon.log('error showing order ', err);
        res.json(err);
      } else {
        decon.log('successfully found order', result);
        res.json(result);
      }
    });
  };
  _this.receive = function(req,res){
    console.log('got to the server controller with the order id and recipient', req.params.id, req.body);
    Order.findById(req.params.id, function (err, order) {
      if (err) {
        decon.log('there was an error Finding order',err);
        res.json(err);
      } else {
        if (!order.received) {
          Order.findByIdAndUpdate(req.params.id,{$set: {recipient:req.body, received:true}}, function(err,result){
            if(err){
              decon.log('there was an error updating order',err);
              res.json(err);
            } else {
              decon.log('successfully updated order', result);
              result.message = "Successfully Updated Order";
              result.success = true;
              res.json(result);
            }
          });
        } else {
          decon.log('Order has been already received.');
          order.message = "Order has been already received.";
          order.success = true;
          res.json(order);
        }
      }
    });
  };
}

module.exports = new OrdersController();
