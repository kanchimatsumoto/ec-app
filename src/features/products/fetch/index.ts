import { Dispatch } from 'react';
import { Action } from '@reduxjs/toolkit';
import { productsCol } from '@src/firebase';
import { getDocs, orderBy, query, where } from '@firebase/firestore';
import { fetchProductsAction } from '@features/products/slice';
import { Product } from '@features/products/types';

export const fetchProducts = (gender?: string, category?: string) => {
  return async (dispatch: Dispatch<Action>) => {
    let q = query(productsCol, orderBy('updated_at', 'desc'));
    q = gender ? query(q, where('gender', '==', gender)) : q;
    q = category ? query(q, where('category', '==', category)) : q;

    return getDocs(q).then((querySnapshot) => {
      const productList: Product[] = [];
      querySnapshot.forEach((snapshot) => {
        const product = snapshot.data();
        productList.push(product);
      });
      dispatch(fetchProductsAction(productList));
    });
  };
};
