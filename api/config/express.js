(function() {
	"use strict";

	var config = require("./config"),
		express = require("express"),
		morgan = require("morgan"),
		bodyParser = require("body-parser"),
		methodOverride = require("method-override");

	// Return an express app
	module.exports = () => {

		var app = express();
		var port = process.env.PORT || 3000;
		var env = process.env.NODE_ENV || 'dev';

		// I. Configure logging
		app.use(morgan("dev"));

		// II. Configure request body encoding
		app.use(bodyParser.urlencoded({extended: true}));
		app.use(bodyParser.json());
		app.use(methodOverride());

		// III. Configure port number
		app.set("port", port);

		// IV. Configure static directory
		app.use(express.static("./public"));

		// VI. Register Modules
		// Products module
		app.use("/products", require("../products/routes/products.server.routes"));
		app.use("/categories", require("../categories/routes/categories.server.routes"));

		// VIi. Error middleware handlers
		// 404 Error
		app.use((req, res, next) => {
			let err = new Error("Route Not Found.");
			err.status = 404;
			next(err);
		});

		// main error handler (500 status code by default)
		app.use((err, req, res, next) => {
			res.status(err.status || 500);
			res.setHeader("Content-Type", "application/json");
			res.end(JSON.stringify({
				message: err.message,
				error: err
			}, null, 4));
		});

		return app;
	};
})();
