import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@features/users/types';
import { CartProduct } from '@features/products/types';

const initialState: User = {
  username: '',
  isSignedIn: false,
  uid: '',
  role: '',
  email: '',
  customer_id: '',
  cart: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInAction(state, action: PayloadAction<User>) {
      return { ...state, ...action.payload };
    },
    signUpAction(state, action: PayloadAction<User>) {
      return { ...state, ...action.payload };
    },
    signOutAction(state) {
      return { ...state, ...initialState };
    },
    fetchProductsInCartAction(state, action: PayloadAction<CartProduct[]>) {
      return { ...state, cart: [...action.payload] };
    },
  },
});

export const { signInAction, signUpAction, signOutAction, fetchProductsInCartAction } =
  userSlice.actions;

export default userSlice.reducer;
