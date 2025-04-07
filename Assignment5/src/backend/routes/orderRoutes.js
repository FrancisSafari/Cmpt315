const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  const orders = await Order.find().populate('productId');
  res.json(orders);
});

router.post('/', async (req, res) => {
  const { productId, quantity, deliveryDate, email } = req.body;

  const product = await Product.findById(productId);
  if (!product || product.stock < quantity) {
    return res.status(400).json({ message: 'Insufficient stock or product not found.' });
  }

  const order = new Order({ productId, quantity, deliveryDate, email });
  await order.save();

  product.stock -= quantity;
  await product.save();

  res.json(order);
});

router.put('/cancel/:id', async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order || order.status === 'Canceled') {
    return res.status(404).json({ message: 'Order not found or already canceled.' });
  }

  const today = new Date();
  const delivery = new Date(order.deliveryDate);
  const diffDays = (delivery - today) / (1000 * 60 * 60 * 24);

  if (diffDays > 5) {
    order.status = 'Canceled';
    await order.save();

    const product = await Product.findById(order.productId);
    if (product) {
      product.stock += order.quantity;
      await product.save();
    }

    res.json({ message: 'Order canceled and stock restored.' });
  } else {
    res.status(400).json({ message: 'Cannot cancel order within 5 days of delivery date.' });
  }
});

module.exports = router;
