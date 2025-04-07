const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  const { sort, order = 'asc', category, price_gte, price_lte } = req.query;
  let filter = {};

  if (category) filter.category = category;
  if (price_gte && price_lte) filter.price = { $gte: Number(price_gte), $lte: Number(price_lte) };

  const sortOptions = sort ? { [sort]: order === 'asc' ? 1 : -1 } : {};
  const products = await Product.find(filter).sort(sortOptions);
  res.json(products);
});

module.exports = router;
