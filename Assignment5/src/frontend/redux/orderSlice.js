import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOrders = createAsyncThunk('orders/fetch', async () => {
  const res = await axios.get('http://localhost:5000/orders');
  return res.data;
});

export const cancelOrder = createAsyncThunk('orders/cancel', async (id) => {
  const res = await axios.put(`http://localhost:5000/orders/cancel/${id}`);
  return { id, message: res.data.message };
});

const orderSlice = createSlice({
  name: 'orders',
  initialState: { items: [] },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        const order = state.items.find(o => o._id === action.payload.id);
        if (order) order.status = 'Canceled';
      });
  }
});

export default orderSlice.reducer;