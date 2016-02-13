(function() {
	"use strict";

	// Preconfigured mongoose instance
	var mongoose = require("./api/config/mongoose");

	// Preconfigured express app
	var express = require("./api/config/express");

	var db = mongoose(); // DB instance
	var app = express(); // App instance

	// Run the app
	app.listen(app.get("port"), () => {
		console.log("Server running on localhost:" + app.get("port"));
	});

})();
