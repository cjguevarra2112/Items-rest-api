(function() {
    "use strict";

	/**
		CATEGORIES MODULE

		Middleware functions for category modules

	**/

	var Category = require("mongoose").model("Category");
	var Products = require("mongoose").model("Product");

	// helper functions
	var hf = require("../../share/helper_functions");

    /** Categories middleware **/

	// Retrieves list of categories
	exports.list = (req, res, next) => {
        Category.find({}, (err, categories) => {
			if (err) return next(err);
			res.end(JSON.stringify(categories, null, 4));
		});
    }

	// Retrieves list of products of a category
	exports.products = (req, res, next) => {
		var categoryId = hf.toObjectId(req.params._id);
		Products.find({category: categoryId}, (err, products) => {
			if (err) return next(err);
			res.end(JSON.stringify(products, null, 4));
		});
	}

	// Retrives a specific category
    exports.get = (req, res, next) => {
		var categoryId = hf.toObjectId(req.params._id);
		Category.find({_id: categoryId},(err, category) => {
			if (err) return next(err);

			if (category.length === 0) {
				let err = new Error("Category not found.");
				err.status = 404;
				next(err);
			}
			res.end(JSON.stringify({
				category: category.pop()
			}, null, 4));
		});
    }

	exports.create = (req, res, next) => {
		var reqBody = req.body;
		var newCategory = new Category(reqBody);

		newCategory.save(newCategory, (err) => {
			if (err) return next(err);
			res.end(JSON.stringify({
				newCategory: newCategory
			}, null, 4));
		});
	}

	exports.update = (req, res, next) => {
		var categoryId = hf.toObjectId(req.params._id);
		var reqBody = req.body;

		Category.findByIdAndUpdate(categoryId, reqBody, (err, category) => {
			if (err) return next(err);
			res.end(JSON.stringify({category: reqBody.name}, null, 4));
		});
	}

	exports.remove = (req, res, next) => {
		var categoryId = hf.toObjectId(req.params._id);
		Category.remove({_id: categoryId}, (err, result) => {
			if (err) return next(err);
			res.end(JSON.stringify({removed: true}, null, 4));
		});
	}

})();
