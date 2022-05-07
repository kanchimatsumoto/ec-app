import { Timestamp } from 'firebase/firestore';

export interface UploadImage extends File {
  id: string;
  url: string;
}

export type Size = {
  size: string;
  quantity: number;
};

export interface Product {
  id?: string;
  name: string;
  description: string;
  category: string;
  gender: string;
  price: string;
  sizes: Size[];
  images?: UploadImage[];
}

export interface CartProduct extends Omit<Product, 'sizes' | 'category'> {
  added_at?: Timestamp;
  productId: string;
  quantity: number;
  size: Size;
  cartId: string;
}
