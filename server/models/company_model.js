var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var company = new mongoose.Schema({
  name: { type:String, required:true, minlength:3},
  products: [{ type: Schema.Types.ObjectId, ref: 'Product', required:false}],
  email: { type:String, required: true, minlength:5},
  phone: { type:String, required: true, minlength:10},
  address: {
    street: { type:String, required:true, minlength:2 },
    city: { type:String, required:true, minlength:2 },
    zipcode: { type:Number, required:true, minlength:5, maxlength:5 },
    state: { type:String, required:true, minlength:5 }
    },
}, {timestamps: true});

mongoose.model('Company', company);
