import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

//create new router object
const router = express.Router();

//when an HTTP POST request is made to the '/auth' path,
//the authUser function will be called to handle the request.
router.post("/auth", authUser);
router.post("/", registerUser);
router.post("/logout", logoutUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

export default router;
