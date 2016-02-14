(function() {
	"use strict";

	var Product = require("mongoose").model("Product");

	/** Some helper functions **/

	// Returns true if string is a valid mongodb ObjectId
	var isObjectId = (str) => {
		return require("mongoose").Types.ObjectId.isValid(str);
	};

	// Returns a mongodb ObjectId based on a string
	var toObjectId = (str) => {
		return require("mongoose").Types.ObjectId(str);
	};

	/** Controller middlewares **/

	exports.list = (req, res, next) => {
		Product.find({}, (err, products) => {
			if (err) return console.error(err);
			res.end(JSON.stringify(products, null, 4));
		});
	};

	exports.get = (req, res, next) => {
		if (!isObjectId(req.params._id)) {
			let err = new Error("Got an invalid object Id");
			err.status = 400;
			next(err);
		}

		var productId = toObjectId(req.params._id);

		Product.find({_id: productId}, (err, product) => {
			if (err) return console.error(err);
			res.end(JSON.stringify(product, null, 4));
		});
	};

	exports.create = (req, res, next) => {
		var reqBody = req.body;
		var newProduct = new Product(reqBody);

		newProduct.save( (err) => {
			if (err) return next(err);

			res.setHeader("Content-Type", "application/json")
			res.end(JSON.stringify(newProduct, null, 4));
		});
	};

	exports.update = (req, res, next) => {
		if (!isObjectId(req.params._id)) {
			let err = new Error("Got an invalid object Id");
			err.status = 400;
			next(err);
		}

		var productId = toObjectId(req.params._id);
		var reqBody = req.body;

		Product.findByIdAndUpdate(productId, reqBody, (err, product) => {
			if (err) return next(err);
			res.end(JSON.stringify({product: reqBody}, null, 4));
		});
	}

	exports.remove = (req, res, next) => {
		if (!isObjectId(req.params._id)) {
			let err = new Error("Got an invalid object Id");
			err.status = 400;
			next(err);
		}

		var productId = toObjectId(req.params._id);
		Product.remove({_id: productId}, (err, result) => {
			if (err) return next(err);
			res.end(JSON.stringify({removed: true}));
		});
	}

})();
