const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');
const recordRoutes = require('./routes/recordRoutes');
const summaryRoutes = require('./routes/summaryRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', userRoutes);
app.use('/records', recordRoutes);
app.use('/summary', summaryRoutes);

// ML endpoint
app.post('/predict-category', (req, res) => {
  const { note } = req.body;
  if (!note) {
    return res.status(400).json({ error: 'Note is required' });
  }
  const MLService = require('./services/mlService');
  const category = MLService.predictCategory(note);
  res.json({ category });
});

app.use(errorMiddleware);

module.exports = app;