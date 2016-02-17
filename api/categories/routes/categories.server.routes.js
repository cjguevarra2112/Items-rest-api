(function() {
    "use strict";

    var express = require("express"),
        router = express.Router(),
        categories = require("../controllers/categories.server.controller");

	// helper middlewares
	var hm = require("../../share/helper_middlewares");

	/**
		///////////////////////
		// Categories Module //
		///////////////////////

		* fields are required

		GET /categories
		-----------------------------------
			=> retrieves LIST of categories


		GET /categories/<category id>
		-----------------------------------
			=> retrives a SPECIFIC category


		GET /categories/<*category id>/products
		-----------------------------------
			=> retrieves category's LIST of products


		POST /categories
		-----------------------------------
		body: { name: <*category name> }
			=> Creates a new category


		PUT /categories/<*category id>
		-----------------------------------
		body: { <key-value pairs to update> }
			=> Updates a category using key-value pairs

		DELETE /categories/<category id>
		-----------------------------------
			=> Deletes a category
	**/

    router.get("/", categories.list);
	router.get("/:_id/products", hm.hasValidObjectId, categories.products);
    router.get("/:_id", hm.hasValidObjectId, categories.get);
	router.post("/", categories.create);
	router.put("/:_id", hm.hasValidObjectId, categories.update);
	router.delete("/:_id", hm.hasValidObjectId, categories.remove);

    module.exports = router;
})();
