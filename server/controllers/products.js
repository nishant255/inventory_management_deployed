console.log("Loading Serverside products.js");

var mongoose = require('mongoose'),
    Product = mongoose.model('Product');

function ProductsController() {

  var _this = this;

  // -------------------------------------------------------------------------
  //                           My Controller Method
  // -------------------------------------------------------------------------
  _this.index = function(req, res){
    console.log('got to the server controller and about to search for products in DB');
    Product.find({}).populate('products').exec(function(err,result){
      if(err){
        console.log('there was an error finding products',err);
        res.json(err);
      } else {
        console.log('successfully found products', result);
        res.json(result)
      }
    })
  }
  _this.findProduct = function(req, res){
    console.log('got to the server controller and about to serach for product with id',req.params);
    Product.findById(req.params.product_id, function(err,result){
      if(err){
        console.log('there was an error finding product',err);
        res.json(err)
      } else {
        console.log('successfully found product',result);

        res.json(result)
      }
    })
  }
  _this.create = function (req, res) {
    console.log('got to the server controller with product data ',req.body);
    Product.create(req.body,function(err,result){
      if(err){
        console.log('there was an error creating product',err);
        res.json(err)
      } else {
        console.log('successfully created product ',result);
        res.json(result)
      }
    })
  }
  _this.show = function(req,res){
    console.log('got to the server with product id ', req.params.id);
    Product.findOne({_id: req.params.id}, function(err,result){
      if (err){
        console.log('error showing product');
      } else {
        console.log('successfully got product ', result);
        res.json(result)
      }
    })
  }
  _this.findByName = function(req,res){
    console.log('got to the server with the product name',req.params.name);
    Product.find({name:req.params.name},function(err,result){
      if(err){
        console.log('there was an error finding product',err);
        res.json(err)
      } else {
        console.log('found product',result);
        res.json(result)
      }
    })
  }
  _this.setSellPriceToZero = function(req,res){
    console.log('got ot the server function setSellPriceToZero with the product name',req.params.name);
    Product.update({name:req.params.name},{$set: {sellPrice:0}},function(err,result){
      if(err){
        console.log('there was an error updating product sellprice to zero',err);
        res.json(err)
      } else {
        console.log(`updated product ${req.params.name} sellprice to zero`,result);
        res.json(result)
      }
    })
  }
  _this.indexWithSellPrice = function(req, res){
    console.log('got to the server function indexWithSellPrice');
    Product.find({sellPrice:{$gt:-1}}).populate('_company').exec(function(err,result){
      if(err){
        console.log('there was an error finding items with sellprice',err);
        res.json(err)
      } else {
        console.log('found all items with sellprice',result);
        res.json(result)
      }
    })
  }
  _this.indexforSale = function(req, res){
    console.log('got to the server function indexforSale');
    Product.find({sellPrice:{$gt:0}}).populate('_company').exec(function(err,result){
      if(err){
        console.log('there was an error finding items with sellprice',err)
        res.json(err)
      } else {
        console.log('found all items with sellprice',result);
        res.json(result)
      }
    })
  }

  _this.updateQuantity = function(product,callback){
    callback()
  }
  _this.updateloop = function(products,product_num){
    _this.updateQuantity(products[product_num],function(){
      var currentProduct = products[product_num]
      Product.findById(products[product_num]._id,function(err,result){
        if(err){
          console.log('err finding product');
        } else {
          console.log('got product',result);
          console.log('order quantity',currentProduct.quantity);
          if(!result.sellPrice){
            result.sellPrice = 0
          }
          if(!result.quantity){
            result.quantity = 0
          }
          result.quantity+= currentProduct.quantity
          result.save(function(err,result){
            if(err){
              console.log('there was error saving',err);
            } else {
              console.log('we did it! TEH!',result);
            }
          })
        }
      })
      product_num ++
      if(product_num<products.length){
        _this.updateloop(products,product_num)
      }
    })
  }
  _this.receiveOrder = function(req,res){
    var product_num = 0
    var order = req.body
    console.log('got to the server with the order!',order);
    _this.updateloop(order.products,product_num)
  }
  _this.update = function(req,res){
    console.log('got to the server with the product',req.body);
    Product.findByIdAndUpdate(req.body._id,{$set: {sellPrice:req.body.sellPrice}}, function(err,result){
      if(err){
        console.log('there was an error updating order',err);
        res.json(err)
      } else {
        console.log('successfully updated order',result);
        res.json(result)
      }
    })
    // Product.findOne(({_id:req.body._id}, function (err, product) {
    //   if (err) {
    //     console.log('there was an error finding product',err);
    //     res.json(err)
    //   } else {
    //     product.sellPrice = req.body.sellPrice
    //     product.save(function (err, updatedProduct) {
    //       if (err) {
    //         console.log('there was an error updating product',err);
    //         res.json(err)
    //       } else {
    //         console.log("Updated Product");
    //         res.json(updatedProduct);
    //       }
    //     })
    //   }
    // })
    // Product.update({_id:req.body._id},req.body,function(err,result){
    //   if(err){
    //     console.log('there was an error updating',err);
    //     res.json(err)
    //   } else {
    //     console.log('succusssssssssssss',result);
    //     res.json(result)
    //   }
    // })
  }
}

module.exports = new ProductsController();
