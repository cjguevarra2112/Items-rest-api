(function() {
	"use strict";

	var express = require("express"),
		router = express.Router(),
		products = require("../controllers/products.server.controller");

	router.get("/", products.list);

	router.get("/:_id", products.get);

	router.post("/", products.create);

	router.put("/:_id", products.update);

	router.delete("/:_id", products.remove);

	module.exports = router;
})();
