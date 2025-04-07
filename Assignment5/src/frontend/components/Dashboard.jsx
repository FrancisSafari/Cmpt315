import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, setFilters } from '../redux/productSlice';
import OrderForm from './OrderForm';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { items: products, filters } = useSelector(state => state.products);

  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    dispatch(fetchProducts({
      sort: sortColumn,
      order: sortOrder,
      category: selectedCategory,
      price_gte: minPrice,
      price_lte: maxPrice
    }));
  }, [sortColumn, sortOrder, selectedCategory, minPrice, maxPrice]);

  const toggleSort = (col) => {
    if (sortColumn === col) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(col);
      setSortOrder('asc');
    }
  };

  return (
    <div>
      <h2>Product Dashboard</h2>
      <div>
        <label>Category: </label>
        <select onChange={e => setSelectedCategory(e.target.value)}>
          <option value="">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Books">Books</option>
          <option value="Clothing">Clothing</option>
        </select>

        <label>Min Price: </label>
        <input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} />

        <label>Max Price: </label>
        <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
      </div>

      <table>
        <thead>
          <tr>
            <th onClick={() => toggleSort('name')}>Name</th>
            <th onClick={() => toggleSort('price')}>Price</th>
            <th onClick={() => toggleSort('stock')}>Stock</th>
            <th>Order</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>{product.stock}</td>
              <td>
                {product.stock > 0 ? (
                  <OrderForm product={product} />
                ) : (
                  <button disabled>Out of Stock</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;