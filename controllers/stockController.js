const axios = require('axios');
const Stock = require('../models/stocks');

const fetchPrice = async (symbol) => {
  try {
    const response = await axios.get(
      `https://stock-price-checker-proxy.freecodecamp.rocks/v1/stock/${symbol}/quote`
    );
    if (response.data && response.data.latestPrice) {
      return parseFloat(response.data.latestPrice);
    } else {
      throw new Error('Invalid stock data');
    }
  } catch (err) {
    console.error(`Error fetching stock data for ${symbol}:`, err.message);
    return null;
  }
};

exports.getStockData = async (req, res) => {
  let { stock, like } = req.query;
  const ip = req.ip;
  const isLike = like === 'true';

  if (!stock) return res.status(400).json({ error: 'Stock is required' });

  const stocks = Array.isArray(stock) ? stock : [stock];
  const results = [];

  for (let sym of stocks) {
    sym = sym.toUpperCase();

    let stockDoc = await Stock.findOne({ symbol: sym });
    if (!stockDoc) {
      stockDoc = new Stock({ symbol: sym });
      await stockDoc.save();
    }

    if (isLike && !stockDoc.likes.includes(ip)) {
      stockDoc.likes.push(ip);
      await stockDoc.save();
    }

    const price = await fetchPrice(sym);
    if (price === null) {
      return res.status(404).json({ error: `Could not fetch data for ${sym}` });
    }

    results.push({ symbol: sym, price, likes: stockDoc.likes.length });
  }

  if (results.length === 2) {
    const [stock1, stock2] = results;
    return res.json({
      stockData: [
        {
          stock: stock1.symbol,
          price: stock1.price,
          rel_likes: stock1.likes - stock2.likes
        },
        {
          stock: stock2.symbol,
          price: stock2.price,
          rel_likes: stock2.likes - stock1.likes
        }
      ]
    });
  } else {
    return res.json({
      stockData: {
        stock: results[0].symbol,
        price: results[0].price,
        likes: results[0].likes
      }
    });
  }
};
