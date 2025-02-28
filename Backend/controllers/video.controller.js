const { TryCatch, ErrorHandler } = require("../utils/feature.util");
const Video = require("../models/video.model");
const mongoose = require("mongoose");
const { uploadToS3 } = require("../utils/s3Upload");

// Upload Video
const uploadDetails = TryCatch(async (req, res, next) => {
	const { title, description, videoId } = req.body;
	const uploader = req.userId;
	console.log("Received files:", req.files);

	if (videoId) {
		const existingVideo = await Video.findById(videoId);
		if (!existingVideo) {
			return next(new ErrorHandler("Video not found", 404));
		}

		let videoUrl = existingVideo.video_url;
		let thumbnailUrl = existingVideo.thumbnail;
		let qualities = existingVideo.qualities;

		if (req.files?.video) {
			videoUrl = await uploadToS3(req.files.video[0], "videos");
			qualities = [
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
		}

		if (req.files?.thumbnail) {
			thumbnailUrl = await uploadToS3(req.files.thumbnail[0], "thumbnails");
		}

		const updatedVideo = await Video.findByIdAndUpdate(
			videoId,
			{
				title,
				description,
				video_url: videoUrl,
				qualities,
				thumbnail: thumbnailUrl,
			},
			{ new: true }
		);

		return res
			.status(200)
			.json({ message: "Video updated successfully", data: updatedVideo });
	}

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
		views: [],
		likes: [],
		thumbnail: thumbnailUrl,
	});

	res.status(201).json({ message: "Upload successful", data: newVideo });
});

//  Get all Videos
const getAllVideos = TryCatch(async (req, res) => {
	const page = parseInt(req.query.page) || 1;
	const limit = parseInt(req.query.limit) || 2;
	const skip = (page - 1) * limit;

	const videos = await Video.find({}).skip(skip).limit(limit);
	const totalVideos = await Video.countDocuments();

	res.status(200).json({
		success: true,
		count: videos.length,
		page,
		totalPages: Math.ceil(totalVideos / limit),
		data: videos,
	});
});

// Get Single Video
const getSingleVideo = TryCatch(async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return next(new ErrorHandler("Invalid video ID", 400));
	}

	const video = await Video.findById(id);

	if (!video) {
		return next(new ErrorHandler("Video not found", 400));
	}

	res.status(200).json({
		success: true,
		data: video,
	});
});

// Count Views
const countViews = TryCatch(async (req, res) => {
	const { id } = req.params;
	const userId = req.userId;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return next(new ErrorHandler("Invalid video ID", 400));
	}

	const video = await Video.findById(id);

	if (!video) {
		return res.status(404).json({ success: false, message: "Video not found" });
	}

	// Always check if the views array exists before using it
	if (!video.views) {
		video.views = [];
	}

	const viewed = video.views.find((view) => view.toString() === userId);

	if (viewed) {
		return res.status(200).json({
			success: true,
			message: "View already counted",
			totalViews: video.views.length,
		});
	}

	video.views.push(userId);
	await video.save();

	res.status(200).json({
		success: true,
		message: "View counted",
		totalViews: video.views.length,
	});
});

// Search Video
const searchVideos = TryCatch(async (req, res) => {
	const { title } = req.query;

	if (!title) {
		return res
			.status(400)
			.json({ success: false, message: "Title is required" });
	}

	const regex = new RegExp(title, "i");
	const videos = await Video.find(
		// $or: [{ title: regex }, { description: regex }],
		{ title: regex }
	);

	res.status(200).json({ success: true, data: videos });
});

// Like Video
const videoLikes = TryCatch(async (req, res) => {
	const { id } = req.params;
	const userId = req.userId;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res
			.status(400)
			.json({ success: false, message: "Invalid video ID" });
	}

	const video = await Video.findById(id);
	if (!video) {
		return res.status(404).json({ success: false, message: "Video not found" });
	}

	// likes array is initialized
	if (!video.likes) {
		video.likes = [];
	}

	const likedIndex = video.likes.findIndex(
		(like) => like.toString() === userId
	);

	if (likedIndex !== -1) {
		// unlike video
		video.likes.splice(likedIndex, 1);
		await video.save();
		return res.status(200).json({
			success: true,
			message: "Like removed",
			likesCount: video.likes.length,
		});
	}

	// like video
	video.likes.push(userId);
	await video.save();
	res.status(200).json({
		success: true,
		message: "Video liked",
		likesCount: video.likes.length,
	});
});

// Delete Video
const deleteVideo = TryCatch(async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return next(new ErrorHandler("Invalid video ID", 400));
	}

	const video = await Video.findById(id);
	if (!video) {
		return next(new ErrorHandler("Video not found", 400));
	}

	await Video.findByIdAndDelete(id);

	res.status(200).json({
		success: true,
		message: "Video deleted successfully",
	});
});

module.exports = {
	uploadDetails,
	getAllVideos,
	searchVideos,
	getSingleVideo,
	deleteVideo,
	countViews,
	videoLikes,
};
