(function() {
	"use strict";

	var express = require("express"),
		router = express.Router(),
		products = require("../controllers/products.server.controller");

	var hm = require("../../share/helper_middlewares");

	router.get("/", products.list);
	router.get("/:_id", hm.hasValidObjectId, products.get);
	router.post("/", hm.checkCategory, products.create);
	router.put("/:_id", hm.hasValidObjectId, hm.checkCategory, products.update);
	router.delete("/:_id", hm.hasValidObjectId, products.remove);

	module.exports = router;
})();
