
function debugController() {
  var debug = false;
  this.log =  function (String) {
    if (debug) {
      console.log(String);
    }
  };
}

module.exports = new debugController();
