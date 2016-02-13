(function() {
    "use strict";

    var express = require("express"),
        router = express.Router(),
        categories = require("../controllers/categories.server.controller");
    
    router.get("/", categories.list);
    router.get("/:_id", categories.get);

    module.exports = router;
})();