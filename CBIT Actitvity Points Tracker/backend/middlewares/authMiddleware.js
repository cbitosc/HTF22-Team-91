const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      // token looks like - Bearer <token> something
      token = req.headers.authorization.split(" ")[1]; // we need token

      // verify token
      // JWT_SECRET = 'abcd1234'
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not Authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, no token");
  }
});

const adminProtect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      // token looks like - Bearer <token> something
      token = req.headers.authorization.split(" ")[1]; // we need token

      // verify token
      // JWT_SECRET = 'abcd1234'
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decoded.id).select("-password");
    //   console.log(req.user)
      if (req.user.role === 'Admin') {
        next();
      } 
      else {
        throw new Error("Access denied. Contact Admin");
      }
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error(error.message);
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, no token");
  }
});

const mentorProtect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      // token looks like - Bearer <token> something
      token = req.headers.authorization.split(" ")[1]; // we need token

      // verify token
      // JWT_SECRET = 'abcd1234'
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token
      req.user = await User.findById(decoded.id).select("-password");
    //   console.log(req.user)
      if (req.user.role === 'Admin' || req.user.role === 'Mentor') {
        next();
      } 
      else {
        throw new Error("Access denied. Contact Mentor");
      }
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error(error.message);
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not Authorized, no token");
  }
});

module.exports = { protect, adminProtect, mentorProtect };
