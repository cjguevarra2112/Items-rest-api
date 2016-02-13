(function() {
    "use strict";

    // Categories middleware

    exports.list = (req, res, next) => {
        res.send("List categories");
    }

    exports.get = (req, res, next) => {
        res.send("Get category");
    }

})();