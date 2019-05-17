var express = require('express');
var bodyParser = require("body-parser");
var braintree = require("braintree");
var sa = require('superagent');
var app = express();

app.use(express.static('./'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "rzbrjc57dpyfz8vj",
  publicKey: "sqxq84spsthr6726",
  privateKey: "dd0f2f81c5b638b51440aff4b3453df0"
});

app.get('/', function (req, res) {
	res.send("index.html");
});

app.get("/client_token", function (req, res) {
  gateway.clientToken.generate({}, function (err, response) {
    res.send(response.clientToken);
	});
});

app.get("/pages/success.html", function(req, res) {
	res.send("/pages/success.html");
});

app.post("/checkout", function (req, res) {
	var nonceFromTheClient = req.body.nonce;
	var userEmail = req.body.email;
	var shirtSize = req.body.size;
	gateway.transaction.sale({
  	amount: "10.00",
  	paymentMethodNonce: nonceFromTheClient,
		options: {
			submitForSettlement: true
		}
	}, function (err, result) {
		if (result.success) {
			sa.post("http://requestbin.fullcontact.com/18ek9tr1").send({transaction: result.transaction.id, size: shirtSize, email: userEmail}).end(function(err, res) {
			});
			res.status(200).send();
		}
	});
});

app.post("/validate", function(req, res) {
	gateway.transaction.find(req.body.id, function (err, transaction) {
		console.log("success");
	});
});

app.listen(process.env.PORT || 3000, function() {
	console.log("Listening on port 3000");
});
