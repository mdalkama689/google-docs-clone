import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import Document from "../models/document.model.js";
config();

const options = {
  maxAge: 24 * 60 * 60 * 1000,
  httpOnly: true,
};

const secretKey = process.env.JWT_SECRET_KEY;

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    if (!username.trim() || !password.trim()) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).json({ message: "Please enter a valid username" });
    }
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();
    console.log(user);
    const payload = {
      _id: user._id,
      username: user.username,
    };
    const token = await jwt.sign(payload, secretKey, { expiresIn: "1d" });
    res.cookie("token", token, options);
    user.password = undefined;
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log("error during register user : ", error.message);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username.trim() || !password.trim()) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required",
      });
    }

    const existingUser = await User.findOne({ username });
    if (!existingUser) {
      return res.status(400).json({ message: "Username does not exits" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Username or password is incorrect",
      });
    }

    const payload = {
      _id: existingUser._id,
      username: existingUser.username,
    };
    const token = await jwt.sign(payload, secretKey, { expiresIn: "1d" });
    res.cookie("token", token, options);
    existingUser.password = undefined;
    res.status(201).json({
      success: true,
      message: "User logged in successfully",
      existingUser,
    });
  } catch (error) {
    console.log("error during login user : ", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    console.log("here");
    res.clearCookie("token");
    res.status(201).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.log("error during logout user : ", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

const getAllDocsOfLoggedInUser = async (req, res) => {
  try {
    const userId = req.user._id;
    const allDocs = await Document.find({ docsOwner: userId });

    res.status(201).json({
      success: true,
      message: "Got all docs  successfully",
      allDocs,
    });
  } catch (error) {
    console.log("error during fetchig docs  : ", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export { registerUser, loginUser, logoutUser, getAllDocsOfLoggedInUser };
