(function() {
	"use strict";

	var mongoose = require("mongoose");

	var CategorySchema = new mongoose.Schema({
		name: String,
		createdAt: {
			type: Date,
			default: Date.now
		}
	});

	mongoose.model("Category", CategorySchema);
})();
