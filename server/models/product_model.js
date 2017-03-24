console.log("Loading product_model.js");
var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var product = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2},
  buyPrice: { type:Number, required: false},
  sellPrice: { type:Number, required: false},
  quantity: { type:Number, required: false},
_company: { type: Schema.Types.ObjectId, ref: 'Company', required:true},
}, {timestamps: true});

mongoose.model('Product', product);
