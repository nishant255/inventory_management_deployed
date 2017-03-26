var decon = require('./../../debugLog.js');
decon.log("Loading mongoose.js");

var mongoose    = require('mongoose'),
    fs          = require ('fs'),
    path        = require('path'),
    db_name     = "inventory_db_2", // <<<<<<<<<<<< CHANGE DB NAME >>>>>>>>>>>>
    reg         = new RegExp( ".js$", "i" ),
    dbURI       = 'mongodb://localhost/' + db_name,
    models_path = path.join( __dirname, "../models"),
    mongoURI    = 'mongodb://nishant255:baps1920@ds117830.mlab.com:17830/inventory_db_2';


mongoose.connect(process.env.MONGOLAB_URI || dbURI);
mongoose.Promise = global.Promise;

mongoose.connection.on('connected', function () {
  console.log(`Mongoose default connection open to ${ dbURI }`);
});

mongoose.connection.on( 'error', function ( err ) {
  console.error( `Mongoose default connection error: ${ err }` );
});

mongoose.connection.on( 'disconnected', function () {
  console.log( 'Mongoose default connection disconnected' );
});

process.on( 'SIGINT', function() {
  mongoose.connection.close( function () {
    console.log( 'Mongoose default connection disconnected through app termination' );
    process.exit( 0 );
  });
});

fs.readdirSync(models_path).forEach(function (file) {
    if ( reg.test( file ) ) {
        require( path.join( models_path, file ) );
    }
});
