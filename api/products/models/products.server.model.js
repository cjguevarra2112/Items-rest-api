(function() {
	"use strict";

	var mongoose = require("mongoose");

	var ProductSchema = new mongoose.Schema({
		name: String,
		price: Number,
		stock: Number,
		description: String,
		category: String,
		createdAt: {
			type: Date,
			default: Date.now
		}
	});
	mongoose.model("Product", ProductSchema);
})();
