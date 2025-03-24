const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    emailId: String,
    deliveryDate: Date
});

module.exports = mongoose.model('Order', OrderSchema);
