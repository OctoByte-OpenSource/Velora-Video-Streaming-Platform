const { userModel } = require("../models/user.model");
const { TryCatch, ErrorHandler } = require("../utils/feature.util");
const { errorMiddleware } = require("./error.middleware");
const jwt = require("jsonwebtoken");

const auth = TryCatch(async (req, res, next) => {
  const tokenString = req.headers["authorization"];
  if (!tokenString)
    return next(new ErrorHandler("Kindly login to access this route", 401));

  const token = tokenString.split("Bearer ")[1];

  if (!token)
    return next(new ErrorHandler("Kindly login to access this route", 401));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await userModel.findById(decoded._id);
  if (!user) return next(new ErrorHandler("You are not authorized", 401));

  req.userId = decoded._id;
  next();
});

module.exports = auth;
