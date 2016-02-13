(function() {
	"use strict";

	var mongoose = require("mongoose");

	var ProductSchema = new mongoose.Schema({
		name: String,
		price: Number,
		stock: Number,
		category: String
	});
})();
