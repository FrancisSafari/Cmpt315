import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders, cancelOrder } from '../redux/orderSlice';

const Orders = () => {
  const dispatch = useDispatch();
  const { items: orders } = useSelector(state => state.orders);

  useEffect(() => {
    dispatch(fetchOrders());
  }, []);

  const handleCancel = (order) => {
    const today = new Date();
    const deliveryDate = new Date(order.deliveryDate);
    const diffDays = (deliveryDate - today) / (1000 * 60 * 60 * 24);
    if (diffDays > 5) {
      dispatch(cancelOrder(order._id));
    } else {
      alert('Cannot cancel this order — delivery is within 5 days.');
    }
  };

  return (
    <div>
      <h2>Your Orders</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Email</th>
            <th>Delivery Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id}>
              <td>{order.productId?.name || 'Product'}</td>
              <td>{order.quantity}</td>
              <td>{order.email}</td>
              <td>{new Date(order.deliveryDate).toLocaleDateString()}</td>
              <td>{order.status}</td>
              <td>
                {order.status !== 'Canceled' && (
                  <button onClick={() => handleCancel(order)}>Cancel</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;