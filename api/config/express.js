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


		// VI. Register Module routes

		// let every route request have application/json mime type for their responses
		app.use((req, res, next) => {
			res.setHeader("Content-Type", "application/json");
			next();
		});

		// Products module
		app.use("/api/products", require("../products/routes/products.server.routes"));
		// Categories module
		app.use("/api/categories", require("../categories/routes/categories.server.routes"));
		// Users module
		app.use("/api/users", require("../users/routes/users.server.routes"));


		// VII. Error middleware handlers

		// 404 Error (First error that might happen by default)
		app.use((req, res, next) => {
			let err = new Error("Route Not Found.");
			err.status = 404;
			next(err);
		});

		// Main error handler (500 status code by default)
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
