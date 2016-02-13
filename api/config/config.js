(function() {
    "use strict";

    // Loads a configuration file based off of the environment
    // the app is run on.

    // THis will look for a NODE_ENV environment variable
    module.exports = require("./env/" + process.env.NODE_ENV + ".js");
})();