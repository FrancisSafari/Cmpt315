import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetch', async (params) => {
  const res = await axios.get('http://localhost:5000/products', { params });
  return res.data;
});

const productSlice = createSlice({
  name: 'products',
  initialState: { items: [], filters: {} },
  reducers: {
    setFilters(state, action) {
      state.filters = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.items = action.payload;
    });
  }
});

export const { setFilters } = productSlice.actions;
export default productSlice.reducer;
