import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sku: { type: String, required: true, unique: true },
  manufacturer: { type: String },
  costPrice: { type: Number },
  sellingPrice: { type: Number },
  color: { type: String },
  size: { type: String },
  description: { type: String },
  images: [{ type: String }],
  videos: [{ type: String }],
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;
