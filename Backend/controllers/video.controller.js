const { TryCatch, ErrorHandler } = require("../utils/feature.util");
const Video = require("../models/video.model");
const mongoose = require("mongoose");
const { uploadToS3 } = require("../utils/s3Upload");

const upload = TryCatch(async (req, res, next) => {
	const { title, description } = req.body;
	const uploader = req.userId;
	console.log("Received files:", req.files);

	if (!req.files || !req.files.video || !req.files.thumbnail) {
		return next(new ErrorHandler("Kindly provide files", 400));
	}

	const videoUrl = await uploadToS3(req.files.video[0], "videos");
	const thumbnailUrl = await uploadToS3(req.files.thumbnail[0], "thumbnails");

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
		uploader,
		thumbnail: thumbnailUrl,
	});

	res.status(201).json({ message: "Upload successful", data: newVideo });
});

const getAllVideos = TryCatch(async (req, res) => {
	const videos = await Video.find({});
	res.status(200).json({
		success: true,
		count: videos.length,
		data: videos,
	});
});

const getSingleVideo = TryCatch(async (req, res) => {
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
});

const deleteVideo = TryCatch(async (req, res) => {
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
	await Video.findByIdAndDelete(id);

	res.status(200).json({
		success: true,
		message: "Video deleted successfully",
	});
});

module.exports = { upload, getAllVideos, getSingleVideo, deleteVideo };
