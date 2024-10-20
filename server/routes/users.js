const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const passport = require("passport");

router.post("/register", async (req, res) => {
	const {username, email, password} = req.body;

	if (!username || !email || !password) {
		return res.status(400).json({message: "All fields are required"});
	}

	try {
		const user = await User.findOne({$or: [{username}, {email}]});
		if (user) {
			return res.status(400).json({message: "User already exists"});
		}

		const newUser = new User({username, email, password});

		const salt = await bcrypt.genSalt(10);
		newUser.password = await bcrypt.hash(password, salt);

		await newUser.save();

		return res.json({message: "User registered successfully"});
	} catch (error) {
		console.error("register error", error);
		res.status(500).send("Server Error");
	}
});

router.post("/login", (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) throw err;
		if (!user) {
			return res.status(400).json({message: info.message});
		} else {
			req.logIn(user, (err) => {
				if (err) throw err;
				return res.json({
					message: "Successfully logged in",
					user: {username: user.username, email: user.email},
				});
			});
		}
	})(req, res, next);
});

router.get("/logout", (req, res) => {
	req.logout(function (err) {
		if (err) next(err);
		return res.json({message: "Logged out"});
	});
});

router.get("/auth", (req, res) => {
	if (req.isAuthenticated()) {
		return res.json({user: req.user});
	} else {
		return res.status(401).json({message: "Login to view this resource"});
	}
});

module.exports = router;
