import express from 'express';
import bcrypt from 'bcrypt';
import Admin from '../models/Admin.js';

const router = express.Router();

// Register Admin
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) return res.status(400).json({ message: 'Admin already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ username, email, password: hashedPassword });
    await newAdmin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed' });
  }
});

export default router;
