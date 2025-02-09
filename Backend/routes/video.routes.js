const express = require("express");
const mongoose = require("mongoose");
const { upload } = require("../middlewares/multer.middleware");
const { uploadToS3 } = require("../utils/s3Upload");
const Video = require("../models/video.model");

const router = express.Router();

router.post(
	"/upload",
	upload.fields([
		{ name: "video", maxCount: 1 },
		{ name: "thumbnail", maxCount: 1 },
	]),
	async (req, res) => {
		try {
			const { title, description } = req.body;
			console.log("Received files:", req.files);

			if (!req.files || !req.files.video || !req.files.thumbnail) {
				return res
					.status(400)
					.json({ error: "Both video and thumbnail are required" });
			}

			const videoUrl = await uploadToS3(req.files.video[0], "videos");
			const thumbnailUrl = await uploadToS3(
				req.files.thumbnail[0],
				"thumbnails"
			);

			// ffmpeg logic remaining
			const qualities = [
				{
					resolution: "360p",
					url: videoUrl.replace("videos/", "videos/360p_"),
				},
				{
					resolution: "480p",
					url: videoUrl.replace("videos/", "videos/480p_"),
				},
				{
					resolution: "720p",
					url: videoUrl.replace("videos/", "videos/720p_"),
				},
				{
					resolution: "1080p",
					url: videoUrl.replace("videos/", "videos/1080p_"),
				},
			];

			const newVideo = await Video.create({
				title,
				description,
				video_url: videoUrl,
				qualities,
				thumbnail: thumbnailUrl,
			});

			res.status(201).json({ message: "Upload successful", data: newVideo });
		} catch (err) {
			console.error("Upload Error:", err);
			res.status(500).json({ error: "Internal Server Error" });
		}
	}
);

router.get("/getAllVideos", async (req, res) => {
	try {
		const videos = await Video.find({});
		res.status(200).json({
			success: true,
			count: videos.length,
			data: videos,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
});

router.get("/getSingleVideo/:id", async (req, res) => {
	try {
		const { id } = req.params;

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({
				success: false,
				message: "Invalid video ID",
			});
		}

		const video = await Video.findById(id);

		if (!video) {
			return res.status(404).json({
				success: false,
				message: "Video not found",
			});
		}

		res.status(200).json({
			success: true,
			data: video,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
});

router.delete("/deleteVideo/:id", async (req, res) => {
	try {
		const { id } = req.params;

		if (!mongoose.Types.ObjectId.isValid(id)) {
			return res.status(400).json({
				success: false,
				message: "Invalid video ID",
			});
		}

		const video = await Video.findById(id);
		if (!video) {
			return res.status(404).json({
				success: false,
				message: "Video not found",
			});
		}

		// Delete video and thumbnail from S3
		// await deleteFromS3(video.video_url);
		// await deleteFromS3(video.thumbnail);

		await Video.findByIdAndDelete(id);

		res.status(200).json({
			success: true,
			message: "Video deleted successfully",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
});

module.exports = router;
