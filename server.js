var express  = require( 'express' ),
    bp       = require('body-parser'),
    path     = require( 'path' ),
    morgan   = require('morgan'),
    passport = require('passport'),
    cool     = require('cool-ascii-faces'),
    root     = __dirname,
    port     = 8000, // Adjust Required Port Number
    project  = "Inventory Management", // Change Project Name
    app      = express();

app.use(express.static('client'));
app.use(express.static('bower_components'));
app.use(bp.json());
app.use(morgan('dev'));
app.use(passport.initialize());

require(path.join(root, './server/config/mongoose.js'));
require(path.join(root, './server/config/routes.js'))(app);
require('./server/config/passport')(passport);

app.listen(process.env.PORT || port, function(){
  console.log(`listening for ${ project } on port ${ port }`);
});
