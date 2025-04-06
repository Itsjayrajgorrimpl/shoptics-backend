// File: routes/adminRoutes.js

import express from 'express'; import bcrypt from 'bcryptjs'; import jwt from 'jsonwebtoken'; import Admin from '../models/Admin.js';

const router = express.Router();

// POST /api/admin/login router.post('/login', async (req, res) => { const { email, password } = req.body;

try { const admin = await Admin.findOne({ email }); if (!admin) return res.status(404).json({ message: 'Admin not found' });

const isMatch = await bcrypt.compare(password, admin.password);
if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
res.status(200).json({ token });

} catch (error) { res.status(500).json({ message: 'Server error', error }); } });

export default router;

