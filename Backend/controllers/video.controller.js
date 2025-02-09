const { TryCatch, ErrorHandler } = require("../utils/feature.util");

const getAllVideos = TryCatch(async (req, res, next) => {
  try {
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
  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = { getAllVideos };
