var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    bcrypt   = require('bcrypt');

var UserSchema = new mongoose.Schema({

  email: { type: String, unique: true, required: true, minlength: 5},
  admin: { type:Number, required: true},
  password: { type: String, required: true, minlength: 4},
  first_name: { type:String, required:true, minlength: 2},
  last_name: { type:String, required:true, minlength: 2},

  address: [{
    name: { type:String, minlength:2 },
    street: { type:String,  minlength:2 },
    city: { type:String,  minlength:2 },
    zipcode: { type:String, minlength:5, maxlength:5 },
    state: { type:String, minlength:2 }
  }],

  phone_number: { type:Number, required:true, minlength: 10},
  _orders: [{ type: Schema.Types.ObjectId, ref: 'Order', required:false}],
  _products: [{ type: Schema.Types.ObjectId, ref: 'Product', required:false}],

}, {timestamps: true});

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);
