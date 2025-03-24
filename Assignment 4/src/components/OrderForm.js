import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

function OrderForm() {
    const { productId } = useParams();
    const history = useHistory();
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [emailId, setEmailId] = useState('');
    const [deliveryDate, setDeliveryDate] = useState('');

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        const { data } = await axios.get(`/api/products/${productId}`);
        setProduct(data);
    };

    const placeOrder = async () => {
        await axios.post('/api/orders', {
            productId,
            quantity,
            emailId,
            deliveryDate
        });
        history.push('/orders');
    };

    return (
        <div>
            <h1>Order Form</h1>
            <h2>{product.name} - ${product.price}</h2>
            <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />
            <input type="email" value={emailId} onChange={e => setEmailId(e.target.value)} />
            <input type="date" value={deliveryDate} onChange={e => setDeliveryDate(e.target.value)} />
            <button onClick={placeOrder}>Confirm Order</button>
        </div>
    );
}

export default OrderForm;
