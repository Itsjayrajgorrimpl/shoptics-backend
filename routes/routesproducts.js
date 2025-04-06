import express from 'express'; import upload from '../middleware/upload.js'; import Product from '../models/Product.js';

const router = express.Router();

// POST /api/products - Add a new product with images and videos router.post('/', upload.fields([ { name: 'images', maxCount: 10 }, { name: 'videos', maxCount: 2 } ]), async (req, res) => { try { const { name, sku, manufacturer, costPrice, sellingPrice, color, size, description } = req.body;

const images = req.files['images']?.map(file => file.filename) || [];
const videos = req.files['videos']?.map(file => file.filename) || [];

const product = new Product({
  name,
  sku,
  manufacturer,
  costPrice,
  sellingPrice,
  color,
  size,
  description,
  images,
  videos
});

await product.save();
res.status(201).json({ message: 'Product added successfully', product });

} catch (err) { console.error(err); res.status(500).json({ message: 'Failed to add product' }); } });

export default router;

