(function() {
	"use strict";

	var mongoose = require("mongoose"),
		config = require("./config");

	module.exports = () => {
		var db = mongoose.connect(config.db);

		// Require models here
		require("../products/models/products.server.model");
		require("../categories/models/categories.server.model");

		return db;
	}
})();
