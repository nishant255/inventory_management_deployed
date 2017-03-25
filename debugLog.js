
function debugController() {
  var debug = true;
  this.log =  function (String) {
    if (debug) {
      console.log(String);
    }
  };
}

module.exports = new debugController();
