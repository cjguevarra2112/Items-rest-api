(function() {
	"use strict";

	var mongoose = require("mongoose");

	var UserSchema = new mongoose.Schema({
		firstName: String,
		lastName: String,
		email: String,
		hash: String,
		registerDate: {
			type: Date,
			default: Date.now
		}
	});

	mongoose.model("User", UserSchema);

})();
