(function() {
	"use strict";

	const express = require("express");
	const bodyParser = require("body-parser");
	let app = express();

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));

	app.use(express.static("public"));

	app.use((req, res, next) => {
		console.log(req.method + " " + req.url);
		console.log("Request Path: " + req.path);
		console.log("Request IP Addr: " + req.ip);
		console.log("Request Protocol: " + req.protocol);
		next();
	});

	app.get("/", (req, res) => {
		res.send("<h1> Hello World! </h1>\n")
	});

	app.get("/apps", (req, res) => {
		res.send("<h1>Our Star Apps </h1>\n")
	});

	app.get("/user/:name/:gender", (req, res) => {
		let token = req.get("apikey");
		let name = req.params.name;
		let gender = {
			"male": "Mr.",
			"female": "Ms."
		}[req.params.gender];

		res.send(`
<h1> Hello, ${gender} ${name}! </h1>
<p> API key: ${token} </p>\n`);
	});

	app.post("/send", (req, res) => {

		// Accepts only application/json mime type
		if (req.is("application/json")) {

			var data = req.body;
			res.end(JSON.stringify(data, null, 4));
		} else {
			res.setHeader("Content-Type", "text/json");
			res.json({"error": "Invalid Content-Type"});
		}
	});




	var server = app.listen(8080, () => {
		let host = server.address().address;
		let port = server.address().port;

		console.log(`App listening on ${host}:${port}`);
	});

})();
