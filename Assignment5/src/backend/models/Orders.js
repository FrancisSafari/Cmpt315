const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  quantity: Number,
  deliveryDate: Date,
  email: String,
  status: { type: String, default: 'Confirmed' }
});

module.exports = mongoose.model('Order', OrderSchema);