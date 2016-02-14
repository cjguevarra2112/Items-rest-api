(function() {
    "use strict";

	var Category = require("mongoose").model("Category");

	/** Some helper functions **/

	// Returns true if string is a valid mongodb ObjectId
	var isObjectId = (str) => {
		return require("mongoose").Types.ObjectId.isValid(str);
	};

	// Returns a mongodb ObjectId based on a string
	var toObjectId = (str) => {
		return require("mongoose").Types.ObjectId(str);
	};

    // Categories middleware
    exports.list = (req, res, next) => {
        Category.find({}, (err, categories) => {
			if (err) return next(err);
			res.end(JSON.stringify(categories, null, 4));
		});
    }

    exports.get = (req, res, next) => {
        if (!isObjectId(req.params._id)) {
			let err = new Error("Got an invalid object Id");
			err.status = 400;
			next(err);
		}
		var categoryId = toObjectId(req.params._id);
		Category.find({_id: categoryId},(err, category) => {
			if (err) return next(err);

			if (category.length === 0) {
				let err = new Error("Category not found.");
				err.status = 404;
				next(err);
			}
			res.end(JSON.stringify({
				category: category
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
		if (!isObjectId(req.params._id)) {
			let err = new Error("Got an invalid object Id");
			err.status = 400;
			next(err);
		}

		var categoryId = toObjectId(req.params._id);
		var reqBody = req.body;

		Category.findByIdAndUpdate(categoryId, reqBody, (err, category) => {
			if (err) return next(err);
			res.end(JSON.stringify({category: reqBody.name}, null, 4));
		});
	}

	exports.remove = (req, res, next) => {
		if (!isObjectId(req.params._id)) {
			let err = new Error("Got an invalid object Id");
			err.status = 400;
			next(err);
		}
		var categoryId = toObjectId(req.params._id);
		Category.remove({_id: categoryId}, (err, result) => {
			if (err) return next(err);
			res.end(JSON.stringify({removed: true}, null, 4));
		});
	}



})();
