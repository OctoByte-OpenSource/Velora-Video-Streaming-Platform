const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { userModel } = require("../models/user.model");
const { TryCatch, ErrorHandler, s3Client } = require("../utils/feature.util");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { compare } = require("bcrypt");
const { default: mongoose } = require("mongoose");
const { uploadToS3 } = require("../utils/s3Upload");

const newUser = TryCatch(async (req, res, next) => {
  const { username, bio, email, password } = req.body;

  const file = req.file;

  if (!file) return next(new ErrorHandler("Profile picture required"));

  // upload to S3;

  const profileImageUrl = await uploadToS3(file, "profileImages");

  // await s3Client.send(command);

  const profileImage = profileImageUrl;

  console.log(profileImage);

  const newUser = await userModel.create({
    username,
    email,
    bio,
    password,
    subcribers: [],
    subscribedChannel: [],
    videos: [],
    profileImage,
  });

  return res.status(201).json({
    success: true,
    message: "User created successfully",
    user: newUser,
  });
});

const login = TryCatch(async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password)
    return next(new ErrorHandler("Credentials required", 403));

  const user = await userModel.findOne({ username }).select("+password");

  console.log(user, password);

  if (!user)
    return next(new ErrorHandler("Username or password incorrect", 403));

  const isMatch = await compare(password, user.password);

  if (!isMatch)
    return next(new ErrorHandler("Username or password incorrect", 403));

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  return res.status(201).json({
    success: true,
    message: "User logged in successfully",
    token,
    user,
  });
});

const getUserInfo = TryCatch(async (req, res, next) => {
  const userId = req.params.id;
  const user = await userModel.findById(userId).populate("videos");
  if (!user) return next(new ErrorHandler("No user found with that detail"));

  const userVideos = user.videos;
  let totalLikes = 0;
  let totalViews = 0;

  userVideos.forEach((video, i) => {
    const video_like = video.likes.length;
    const video_views = video.views.length;
    totalLikes += video_like;
    totalViews += video_views;
  });
  user.totalLikes = totalLikes;
  user.totalViews = totalViews;

  return res.status(200).json({
    success: true,
    message: "User data fetched successfully",
    user,
    totalLikes,
    totalViews,
  });
});

const getAllUsers = TryCatch(async (req, res, next) => {
  const userId = req.userId;
  const searchUser = req.query.name || "";

  const allUsers = await userModel
    .find({
      username: { $regex: searchUser, $options: "i" },
    })
    .sort({ createdAt: -1 })
    .limit(10);

  const allUsersData = allUsers.filter(
    (item) => item._id.toString() !== userId.toString()
  );
  // wrtie code if users data need to modify
  return res
    .status(200)
    .json({ success: true, message: "All users fetched", users: allUsersData });
});

const subscribeChannel = TryCatch(async (req, res, next) => {
  const channelId = req.params.id; //channel Id and userId is same in terms of attributes, here channelId is other usser's Id

  const userId = req.userId;
  if (channelId === userId) return next(new ErrorHandler("Invalid request"));

  const channel = await userModel.findById(channelId);

  if (!channel) return next(new ErrorHandler("Invalid channel details"));

  const user = await userModel.findById(userId);
  if (!user) return next(new ErrorHandler("Invalid user details", 403));

  if (channel.subcribers.includes(userId))
    return next(new ErrorHandler("Channel already subscribed"));
  if (!channel.subcribers.includes(userId)) channel.subcribers.push(userId);
  if (!user.subscribedChannel.includes(userId));
  user.subscribedChannel.push(channelId);

  await channel.save();
  await user.save();

  return res
    .status(200)
    .json({ success: true, message: "Channel subcribed successfully" });
});

const updateBio = TryCatch(async (req, res, next) => {
  const { bio } = req.body;
  const userId = req.userId;
  if (!bio) return next(new ErrorHandler("Bio required!"));

  const user = await userModel.findById(userId);

  user.bio = bio;

  await user.save();
  return res.status(200).json({ success: true, message: "Bio updated" });
});

const updateProfilePhoto = TryCatch(async (req, res, next) => {
  // need to work
  const file = req.file;
  if (!file) return next(new ErrorHandler("Profile picture required"));

  const user = await userModel.findById(req.userId);

  if (!user) return next(new ErrorHandler("Kindly re-login..."));

  //----------->delete previous profile Image<------------------ need to code that

  const previousProfileImage = user.profileImage;
  //upload to S3;
  const profileImageUrl = await uploadToS3(file, "profileImages");
  // await s3Client.send(command);
  const profileImage = {
    url: profileImageUrl,
    public_id: "dummy",
  };

  user.profileImage = profileImage;
  await user.save();

  return res
    .status(200)
    .json({ success: true, message: "Profile Picture updated" });
});

module.exports = {
  newUser,
  login,
  getUserInfo,
  getAllUsers,
  subscribeChannel,
  updateBio,
};
