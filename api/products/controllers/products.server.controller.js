(function() {
	"use strict";

	exports.list = (req, res, next) => {
		res.send("Product List");
	};

	exports.get = (req, res, next) => {
		res.send("Get product");
	};

})();
