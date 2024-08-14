import express from "express";
import {
  getAllDocsOfLoggedInUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/all/docs", authMiddleware, getAllDocsOfLoggedInUser);
export default router;
