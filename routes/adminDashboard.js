import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

// Middleware to verify token
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(403).json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token." });
  }
};

// Protected Dashboard Route
router.get('/dashboard', verifyAdmin, (req, res) => {
  res.status(200).json({
    message: "Welcome to Admin Dashboard!",
    admin: req.admin
  });
});

export default router;
