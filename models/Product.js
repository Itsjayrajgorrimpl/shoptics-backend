import upload from '../middleware/upload.js';

// POST route
router.post('/', upload.fields([
  { name: 'images', maxCount: 5 },
  { name: 'videos', maxCount: 2 }
]), async (req, res) => {
  const imagePaths = req.files['images']?.map(file => file.path) || [];
  const videoPaths = req.files['videos']?.map(file => file.path) || [];

  const newProduct = new Product({
    ...req.body,
    images: imagePaths,
    videos: videoPaths
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: 'Failed to save product', error: err });
  }
});
