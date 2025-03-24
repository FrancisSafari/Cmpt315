const express = require('express');
const Product = require('../models/Product');
const Order = require('../models/Order');
const router = express.Router();

router.post('/', async (req, res) => {
    const { productId, quantity, emailId, deliveryDate } = req.body;
    
    try {
        const product = await Product.findById(productId);
        if (product.stock < quantity) {
            return res.status(400).json({ message: 'Insufficient stock.' });
        }

        const order = new Order({
            productId,
            quantity,
            emailId,
            deliveryDate
        });

        const savedOrder = await order.save();
        product.stock -= quantity;
        await product.save();

        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const orders = await Order.find().populate('productId');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
