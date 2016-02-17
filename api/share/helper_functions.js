(function () {
	"use strict";

	/** Helper functions **/

	var mongoose = require("mongoose");

	// Returns a mongodb ObjectId based on a string
	exports.toObjectId = (str) => {
		return mongoose.Types.ObjectId(str);
	};

	// Returns a 4 tabbed string-ified JSON string
	exports.toJSON = (jsonObj) => {
		return JSON.stringify(jsonObj, null, 4);
	};

})();
