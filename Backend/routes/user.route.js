const express = require("express");
const { multerSingle } = require("../middlewares/multer.middleware");
const {
  newUser,
  login,
  getAllUsers,
  getUserInfo,
  subscribeChannel,
  updateBio,
} = require("../controllers/user.controller");
const auth = require("../middlewares/auth.middleware");

const user = express.Router();

// - multer setup
// - error middleware
// - s3 bucket for thumbnail and profile picture
// - auth middleware,

user.post("/signup", multerSingle, newUser);
user.post("/signin", login);

user.use(auth);
user.get("/getAllUsers", getAllUsers);
user.get("/info/:id", getUserInfo);
user.post("/subscribeChannel/:id", subscribeChannel);
user.post("/update/profilePhoto");
user.post("/update/bio", updateBio);

//done
// cookie based or header based authentication ? #done bearer authentication
// - logout route - no need as we used bearer token , so client side need to invalidate the token
// change bio #done
//search user

//NEED TO DO
// S3 bucket upload
// - change profile picture , depends on rhishi
// upload profile picture

//task for tommorow
// S3 bucket

module.exports = user;
