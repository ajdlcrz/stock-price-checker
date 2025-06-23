const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');

router.get('/stock-prices', stockController.getStockData);

module.exports = router;
