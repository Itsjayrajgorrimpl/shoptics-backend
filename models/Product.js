import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  sku: String,
  manufacturer: String,
  costPrice: Number,
  sellingPrice: Number,
  color: String,
  size: [String],
  images: [String],
  videos: [String],
});

export default mongoose.model('Product', productSchema);
