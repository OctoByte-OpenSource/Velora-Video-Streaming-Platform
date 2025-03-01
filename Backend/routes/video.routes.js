const express = require("express");
const auth = require("../middlewares/auth.middleware");
const { upload } = require("../middlewares/multer.middleware");
const {
	uploadDetails,
	getAllVideos,
	getSingleVideo,
	deleteVideo,
	searchVideos,
	countViews,
	videoLikes,
	getSingleVideoEdit,
} = require("../controllers/video.controller");

const router = express.Router();

router.post(
	"/upload",
	upload.fields([
		{ name: "video", maxCount: 1 },
		{ name: "thumbnail", maxCount: 1 },
	]),
	uploadDetails
);

router.get("/getAllVideos", getAllVideos);

router.get("/getSingleVideo/:id", getSingleVideo);

router.delete("/deleteVideo/:id", deleteVideo);

router.get("/search", searchVideos);

router.patch("/:id/views", auth, countViews);

router.patch("/:id/like", auth, videoLikes);

module.exports = router;
