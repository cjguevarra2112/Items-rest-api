(function() {
	"use strict";

	var app = angular.module("ItemShop", []);

	app.service("CategoryService", ["$http", function($http) {
		var self = this;
		self.list = $http.get("/categories");
	}]);


	app.controller("MainController", ["CategoryService", function(CategoryService) {
		var self = this;
		self.categories = [];

		var listCategories = () => {
			CategoryService.list.then((resp) => {
				self.categories = resp.data;
				console.log(self.categories);
			}, (err) => {
				console.error(err);
			});
		};

		listCategories();

		self.appName = "ItemShop";
	}]);
})();
