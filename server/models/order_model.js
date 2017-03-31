var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var order = new mongoose.Schema({
  sender: {type: Object, required:false},
  recipient: {type: Object, required:true},
  received: {type:Boolean, required:true},
  products: [{
    name:{ type: String, required:true},
    quantity: { type:Number, required: true},
    buyPrice: { type:Number, required: true},
    _company: { type: Schema.Types.ObjectId, ref: 'Company', required:true}
  }],
  numProducts: {type:Number,required:true},
  address: {
    name: { type:String, required:true, minlength:2 },
    street: { type:String, required:true, minlength:2 },
    city: { type:String, required:true, minlength:2 },
    zipcode: { type:String, required:true, minlength:5, maxlength:5 },
    state: { type:String, required:true, minlength:2 }
  },
}, {timestamps: true});

mongoose.model('Order', order);
