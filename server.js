require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();

// Helmet setup
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', "script-src 'self'; style-src 'self'");
  next();
});

app.use(cors());
app.use('/api', apiRoutes);

app.get('/', (req, res) => {
  res.send('Stock Price Checker');
});

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
