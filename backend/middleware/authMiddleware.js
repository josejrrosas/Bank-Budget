/*
Protect Cookie
Parse Cookie
*/
//get payload from jwt which is the userid
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      //has userID in it
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //returns everything but the password
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token.");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token.");
  }
});

//not exporting as default because we might want to add
//some other authentication middleware
export { protect };
