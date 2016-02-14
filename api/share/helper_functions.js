(function () {
	"use strict";

	/** Helper functions **/

	var mongoose = require("mongoose");

	// Returns a mongodb ObjectId based on a string
	exports.toObjectId = (str) => {
		return mongoose.Types.ObjectId(str);
	};

})();
