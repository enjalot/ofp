module.exports = Register;
function Register() {}
Register.prototype.view = __dirname;

Register.prototype.init = function(model) {
  // init is called at the time of instanciation
  this.model.ref("voucher.address", "address")
};
Register.prototype.create = function(model) {
  // create is called when the DOM is ready
};
Register.prototype.save = function() {
  // we've defined a view function, i.e. a function that can be called from the view
  this.model.set("voucher.createdAt", +new Date()) // this should really be done on the server
  voucher = this.model.get('voucher');
  console.log("save!", voucher)
  this.emit("save", voucher)
  this.model.set("voucher", {})
  this.model.set("address", "")
};