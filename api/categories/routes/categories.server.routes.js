(function() {
    "use strict";

    var express = require("express"),
        router = express.Router(),
        categories = require("../controllers/categories.server.controller");

    router.get("/", categories.list);
    router.get("/:_id", categories.get);
	router.post("/", categories.create);
	router.put("/:_id", categories.update);
	router.delete("/:_id", categories.remove);

    module.exports = router;
})();
