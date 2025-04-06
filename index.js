const express = require('express');
const mongoose = require('mongoose');
require('.env').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('DB Error:', err));

// Basic Route
app.get('/', (req, res) => {
  res.send('Shoptics backend is working!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
