(function() {

	"use strict";


	var express = require("express");
	var router = express.Router();
	var users = require("../controllers/users.server.controller.js");

	var hm = require("../../share/helper_middlewares");


	router.get("/", users.list);
	router.get("/:_id", hm.hasValidObjectId, users.get);
	router.post("/login", users.login);
	router.post("/register", users.register);

	module.exports = router;
})()
