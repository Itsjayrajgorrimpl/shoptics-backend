import express from 'express';
import multer from 'multer';
import Product from '../models/Product.js';
import fs from 'fs';
import path from 'path';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const folder = ext === '.mp4' ? 'uploads/videos' : 'uploads/images';

    fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  '/',
  upload.fields([
    { name: 'images', maxCount: 10 },
    { name: 'videos', maxCount: 5 },
  ]),
  async (req, res) => {
    try {
      const imagePaths = (req.files.images || []).map(file => file.path);
      const videoPaths = (req.files.videos || []).map(file => file.path);

      const product = new Product({
        ...req.body,
        size: req.body.size.split(',').map(s => s.trim()),
        images: imagePaths,
        videos: videoPaths,
      });

      await product.save();
      res.status(201).json({ message: 'Product added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Upload error occurred' });
    }
  }
);

export default router;
