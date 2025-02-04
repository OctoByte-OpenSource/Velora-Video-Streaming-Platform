const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		desc: { type: String },
		videoFile: {
			url: { type: String, required: true },
			videoQuality: {
				"360p": { type: String },
				"480p": { type: String },
				"720p": { type: String },
			},
		},
		thumbnail: {
			url: { type: String, default: "" },
		},
		likes: [{ type: mongoose.Types.ObjectId, ref: "User" }],
		views: [{ type: mongoose.Types.ObjectId, ref: "User" }],
		tags: [{ type: String }],
		comments: [
			{
				userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
				comment: { type: String, required: true },
				createdAt: { type: Date, default: Date.now },
			},
		],
		userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Video", VideoSchema);
