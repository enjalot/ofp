module.exports = Vouchers
function Vouchers() {}
Vouchers.prototype.view = __dirname;
Vouchers.prototype.init = function(model) {
  // init is called at the time of instanciation
  this.filter = model.filter("vouchers", "term", function(a) {
    var term = model.get("term");
    if(!term) return true;
    if(!a || !a.address) return false;
    if(a.address.toLowerCase().indexOf(term.toLowerCase()) < 0) return false;
    return true;
  }).sort(function(a,b) {
    return b.voucher - a.voucher
  })
  model.ref("list", this.filter)
};

Vouchers.prototype.create = function(model) {

}

Vouchers.prototype.delete = function(voucher) {
  console.log("voucher", voucher)
  this.model.root.del("vouchers." + voucher.id)

}
