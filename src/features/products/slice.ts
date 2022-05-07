import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@features/products/types';

const initialState: { list: Product[] } = {
  list: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    initProductsAction() {
      return { ...initialState };
    },
    fetchProductsAction(state, action: PayloadAction<Product[]>) {
      return { ...state, list: action.payload };
    },
    deleteProductAction(state, action: PayloadAction<any>) {
      return { ...state, ...action.payload };
    },
  },
});

export const { fetchProductsAction, deleteProductAction } = productSlice.actions;

export default productSlice.reducer;
