(function() {
	"use strict";

	var express = require("./api/config/express");
	var app = express();
	app.listen(app.get("port"), () => {
		console.log("Server running on localhost:" + app.get("port"));
	});  

})();
