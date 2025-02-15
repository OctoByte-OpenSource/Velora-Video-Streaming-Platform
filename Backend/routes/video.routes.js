const express = require("express");
const { upload } = require("../middlewares/multer.middleware");
const { upload, getAllVideos } = require("../controllers/video.controller");

const router = express.Router();

router.post(
	"/upload",
	upload.fields([
		{ name: "video", maxCount: 1 },
		{ name: "thumbnail", maxCount: 1 },
	]),
	upload
);

router.get("/getAllVideos", getAllVideos);

router.get("/getSingleVideo/:id", getSingleVideo);

router.delete("/deleteVideo/:id", deleteVideo);

module.exports = router;
