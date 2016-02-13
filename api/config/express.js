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

		// V. Register Modules

		// Products module
		app.use("/products", require("../products/routes/products.server.routes"));
		app.use("/categories", require("../categories/routes/categories.server.routes"));

		return app;
	};
})();
