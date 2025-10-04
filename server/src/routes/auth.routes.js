import express from "express";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../middleware/asyncHandler.js";
import User from "../models/User.js";
const router = express.Router();

function signToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES || "7d" });
}

router.post("/register", asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Email and password required" });

  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: "Email already registered" });

  const user = await User.create({ email, password, name });
  const token = signToken(user._id);
  res.status(201).json({ token, user: { id: user._id, email: user.email, name: user.name } });
}));

router.post("/login", asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = signToken(user._id);
  res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
}));

router.get("/me", asyncHandler(async (req, res) => {
  // optional: protect this and read from req.user if you want private profile
  res.json({ message: "OK" });
}));

export default router;
