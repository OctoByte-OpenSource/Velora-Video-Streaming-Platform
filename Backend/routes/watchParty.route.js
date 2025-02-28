const express = require("express");
const { TryCatch, ErrorHandler } = require("../utils/feature.util");
const roomModel = require("../models/room.model");

const watchParty = express.Router();

watchParty.post(
  "/create",
  TryCatch(async (req, res, next) => {
    const { roomName, videoId } = req.body;
    // const videoId = "testId";
    console.log(req.body);

    if (!roomName || !videoId)
      return next(new ErrorHandler("data is insuficeint"));

    const checkRoom = await roomModel.findOne({ roomName });
    if (checkRoom)
      return next(new ErrorHandler("Room already exist with that name "));

    const room = await roomModel.create({ roomName, videoId });

    return res
      .status(200)
      .json({ success: true, message: "Room created successfully" });
  })
);

module.exports = watchParty;
