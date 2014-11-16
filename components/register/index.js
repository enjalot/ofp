module.exports = Register;
function Register() {}
Register.prototype.view = __dirname;

Register.prototype.init = function(model) {
  // init is called at the time of instanciation
};
Register.prototype.create = function(model) {
  // create is called when the DOM is ready
};
Register.prototype.save = function() {
  // we've defined a view function, i.e. a function that can be called from the view
  console.log("save!", this.model.get())
  this.emit("save", this.model.get())
  this.model.set("voucher", "")
  this.model.set("name", "")
  this.model.set("address", "")
  this.model.set("phone", "")
};