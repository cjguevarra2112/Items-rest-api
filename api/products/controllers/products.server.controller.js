(function() {
	"use strict";

	var Product = require("mongoose").model("Product");
	var Category = require("mongoose").model("Category");
	var mongoose = require("mongoose");

	// Helper functions
	var hf = require("../../share/helper_functions");

	/** Controller middlewares **/

	// Returns all products
	exports.list = (req, res, next) => {
		Product.find({}, (err, products) => {
			if (err) return console.error(err);
			res.end(JSON.stringify(products, null, 4));
		});
	};

	// Returns a specific product
	exports.get = (req, res, next) => {

		var productId = hf.toObjectId(req.params._id);

		Product.find({_id: productId}, (err, product) => {
			if (err) return next(err);

			if (product.length === 0) {
				let err = new Error("Product not found.");
				err.status = 404;
				next(err);
			}

			res.end(JSON.stringify(product, null, 4));
		});
	};

	// Creates a new product
	exports.create = (req, res, next) => {
		var reqBody = req.body;
		var newProduct = new Product(reqBody);

		newProduct.save( (err) => {
			if (err) return next(err);
			res.end(JSON.stringify(newProduct, null, 4));
		});
	};

	// Updates an existsing product
	exports.update = (req, res, next) => {

		var productId = hf.toObjectId(req.params._id);
		var reqBody = req.body;

		Product.findByIdAndUpdate(productId, reqBody, (err, product) => {
			if (err) return next(err);
			res.end(JSON.stringify({product: reqBody}, null, 4));
		});
	}

	// Removes a product by ObjectId
	exports.remove = (req, res, next) => {

		var productId = hf.toObjectId(req.params._id);
		Product.remove({_id: productId}, (err, result) => {
			if (err) return next(err);
			res.end(JSON.stringify({removed: true}));
		});
	}

})();
