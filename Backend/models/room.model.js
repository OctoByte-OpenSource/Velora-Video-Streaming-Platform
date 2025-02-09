const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  roomName: {
    type: String,
    required: true,
    unique: true,
  },
  //temporary removing
  // videoId: {
  //   type: mongoose.Types.ObjectId,
  //   ref: "video",
  //   required: true,
  // },

  videoUrl: {
    type: String,
    required: true,
  },
});

const roomModel = mongoose.model("room", roomSchema);

module.exports = roomModel;
