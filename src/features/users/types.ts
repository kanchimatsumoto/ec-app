import { Timestamp } from 'firebase/firestore';
import { CartProduct } from '@features/products/types';

export interface User {
  username: string;
  uid: string;
  isSignedIn: boolean;
  role: string;
  email: string;
  customer_id?: string;
  created_at?: Timestamp;
  payment_method_id?: string;
  updated_at?: Timestamp;
  cart: CartProduct[];
}
