
function debugController() {
  var debug = true;
  this.log =  function (func) {
    if(arguments.length > 0)     //be sure to check if there are any...
     var arg1 = arguments[0];
    if (debug) {
      var str = "";
      for (var i = 0; i < arguments.length; i++) {
        str += arguments[i] + " ";
      }
      console.log(arguments);
    }
  };


}

module.exports = new debugController();
