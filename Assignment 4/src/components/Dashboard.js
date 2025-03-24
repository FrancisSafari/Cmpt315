import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dashboard() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const { data } = await axios.get('/api/products');
        setProducts(data);
    };

    return (
        <div>
            <h1>Product Dashboard</h1>
            <ul>
                {products.map(product => (
                    <li key={product._id}>
                        {product.name} - ${product.price}
                        <Link to={`/order/${product._id}`}>Order</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Dashboard;
