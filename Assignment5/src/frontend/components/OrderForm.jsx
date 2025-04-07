import React, { useState } from 'react';
import axios from 'axios';

const OrderForm = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [email, setEmail] = useState('');

  const placeOrder = async () => {
    await axios.post('http://localhost:5000/orders', {
      productId: product._id,
      quantity,
      deliveryDate,
      email
    });
    alert('Order Placed!');
    window.location.href = '/orders';
  };

  return (
    <div>
      <input type="number" min="1" max={product.stock} value={quantity} onChange={e => setQuantity(e.target.value)} />
      <input type="date" value={deliveryDate} onChange={e => setDeliveryDate(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <button onClick={placeOrder}>Confirm</button>
    </div>
  );
};

export default OrderForm;