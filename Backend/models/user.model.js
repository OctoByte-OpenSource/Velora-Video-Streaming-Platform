const { hash } = require("bcrypt");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			unique: true,
		},

		email: {
			type: String,
			required: true,
		},

		bio: {
			type: String,
		},

		password: {
			type: String,
			required: true,
			select: false,
		},

		profileImage: {
			required: true,
			type: String,
		},
		subcribers: [
			{
				type: mongoose.Types.ObjectId,
				ref: "User",
			},
		],
		subscribedChannel: [
			{
				type: mongoose.Types.ObjectId,
				ref: "User",
			},
		],
		videos: [
			{
				type: mongoose.Types.ObjectId,
				ref: "Video",
			},
		],
	},
	{ timestamps: true }
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();

	this.password = await hash(this.password, 10);
});

const userModel = mongoose.model("user", userSchema);

module.exports = { userModel };
