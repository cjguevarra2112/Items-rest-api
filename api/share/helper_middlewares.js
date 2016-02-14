(function () {
	"use strict";

	/****

	 	Helper middlewares

	****/

	var mongoose = require("mongoose");
	var Category = mongoose.model("Category");
	var hf = require("./helper_functions");

	// Checks if a string in the url parameter "_id" is a valid ObjectId
	exports.hasValidObjectId = (req, res, next) => {
		var _id = req.params._id;

		if (!mongoose.Types.ObjectId.isValid(_id)) {
			let err = new Error("Got an invalid ObjectId!");
			err.status = 400;
			next(err);
		} else {
			next();
		}
	}

	// Checks if the category field in the request body is a
	// valid Object Id
	exports.checkCategory = (req, res, next) => {
		var reqBody = req.body;

		if (reqBody.hasOwnProperty("category")) {

			if (!mongoose.Types.ObjectId.isValid(reqBody.category)) {
				let err = new Error("Got an invalid object Id");
				err.status = 400;
				next(err);
			}

			var categoryId = hf.toObjectId(reqBody.category);
			Category.find({_id: categoryId}, (err, category) => {
				if (err) return next(err);
				if (category.length === 0) {
					let err = new Error("Category not found.");
					err.status = 404;
					next(err);
				}
				next();
			});
		} else {
			next();
		}
	};
})();
