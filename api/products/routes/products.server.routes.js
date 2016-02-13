(function() {
	"use strict";

	var express = require("express"),
		router = express.Router(),
		products = require("../controllers/products.server.controller");

	router.get("/", products.list);

	router.get("/:_id", products.get);

	module.exports = router;
})();
