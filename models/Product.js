import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  manufacturer: String,
  description: String,
  costPrice: Number,
  sellingPrice: Number,
  color: String,
  size: [String],
  category: String,
  images: [String], // multiple image paths
  videos: [String], // multiple video paths
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', productSchema);

export default Product;
