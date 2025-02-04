const router = require("express").Router();
const User = require("../models/user.model");
const { TryCatch } = require("../middleware/error.middleware");

// Create
router.get(
	"/",
	TryCatch(async (req, res) => {
		const { username, email, password } = req.body;
		if (!username || !email || !password) {
			return res.status(400).json("Provide all the fields");
		}
		const file = req.file; //Cloudnary & multer setup required
		const user = {
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
		};
		const newUser = new User(user);
		const savedUser = await newUser.save();
		res.status(200).json(savedUser);
	})
);

//
router.get(
	"/getUser",
	TryCatch(async (req, res) => {})
);
