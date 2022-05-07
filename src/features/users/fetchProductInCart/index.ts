import { Action } from '@reduxjs/toolkit';
import { Dispatch } from 'react';
import { fetchProductsInCartAction } from '@features/users/slice';
import { CartProduct } from '@features/products/types';
import { collection, getDocs, getDoc, doc } from '@firebase/firestore';
import { firestore, usersCol } from '@src/firebase';
import { CollectionReference } from 'firebase/firestore';
import { User } from '@features/users/types';

export const fetchProductInCart = (userId: string) => {
  return async (dispatch: Dispatch<Action>) => {
    const userCollection = doc(usersCol, userId);
    getDoc(userCollection).then((snapshot) => {
      const data = snapshot.data();
      const cartProductList: CartProduct[] = data?.cart ?? [];
      dispatch(fetchProductsInCartAction(cartProductList));
    });
  };
};
