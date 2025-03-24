import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OrderList() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const { data } = await axios.get('/api/orders');
        setOrders(data);
    };

    return (
        <div>
            <h1>Orders</h1>
            <ul>
                {orders.map(order => (
                    <li key={order._id}>
                        {order.productId.name} - Quantity: {order.quantity} - Email: {order.emailId}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default OrderList;
