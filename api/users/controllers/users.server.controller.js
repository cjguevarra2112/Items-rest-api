(function() {
	"use strict";

	// Underscore
	var _ = require("underscore");

	// Bcrypt
	var bcrypt = require("bcrypt-nodejs");

	// User model
	var User = require("mongoose").model("User");

	// Helper functions
	var hf = require("../../share/helper_functions");


	// Retrieves a list of users
	exports.list = (req, res, next) => {
		User.find({}, (err, users) => {
			if (err) return next(err);
			res.end(hf.toJSON(users));
		});

	}

	// Retrieves a specific user by ID
	exports.get = (req, res, next) => {
		var userId = hf.toObjectId(req.params._id);

		User.find({_id: userId}, (err, user) => {
			if (err) return next(err);

			if (user.length === 0) {
				let err = new Error("User Not Found");
				err.status = 404;
				return next(err);
			}
			res.end(hf.toJSON({user: user.pop()}));
		});
	}


	// Checks if a user exists based on email/password
	exports.login = (req, res, next) => {
		var body = req.body;
		var errorMessage = "";

		if (!_.has(body, "email")) {
			let err = new Error("Email is required.");
			err.status = 400;
			return next(err);
		}
		if (!_.has(body, "password")) {
			let err = new Error("Password is required.");
			err.status = 400;
			return next(err);
		}


		// Grab the user by email
		User.find({email: body.email}, (err, users) => {
			if (err) return next(err);

			if (users.length === 0) {
				let err = new Error("User Not Found");
				err.status = 404;
				return next(err);
			}

			// grab the single user
			var user = users.pop();

			// compare the password to the hash in the db
			bcrypt.compare(body.password, user.hash, (err, result) => {

				// If password doesnt match the hash
				// return 403 forbidden error
				if(!result) {
					let err = new Error("Invalid Password!");
					err.status = 403;
					return next(err);
				}

				res.end(hf.toJSON({ loggedIn: true }));
			});
		});


	}


	// Creates a new user
	exports.register = (req, res, next) => {
		var body = req.body;
		var requiredFields = ["firstName", "lastName", "email", "password"];

		var hasRequiredFields = requiredFields.every((field) => {
			return body.hasOwnProperty(field);
		});

		if (!hasRequiredFields) {
			let err = new Error("Some fields are required");
			err.status = 400;
			return next(err);
		}

		bcrypt.hash(body.password, null, null, (err, hash) => {
			body.hash = hash;
			delete body.password;
			var newUser = new User(body);
			newUser.save((err) => {
				if (err) return next(err);
				res.end(hf.toJSON(newUser));
			});
		});
	};
})();
