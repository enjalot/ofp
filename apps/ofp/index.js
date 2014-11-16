var derby = require('derby');

var app = module.exports = derby.createApp('ofp', __filename);

if (!derby.util.isProduction) global.app = app;

app.serverUse(module, 'derby-stylus');

app.loadViews(__dirname + '/views');
app.loadStyles(__dirname + '/styles');

app.component(require("../../components/register"));
app.component(require("../../components/vouchers"));

app.proto.save = function(record) {
  var x = {
    voucher: record.voucher,
    name: record.name,
    address: record.address,
    phone: record.phone,
  }
  this.model.add("vouchers", x)
}

app.get('/', function(page, model){

  /*
  page.model.add("vouchers", {voucher: 123, name:"ian", address:"1617 center st", phone:"51012345668"})
  page.model.add("vouchers", {voucher: 124, name:"nate", address:"100 main st", phone:"51012345668"})
  page.model.add("vouchers", {voucher: 125, name:"mei", address:"500 center st", phone:"51012345668"})
  console.log("app get", page.model.get("vouchers"))
  */

  page.model.set("_page.term", "")
  model.subscribe("vouchers", function() {
    page.render('home');
  })
});
