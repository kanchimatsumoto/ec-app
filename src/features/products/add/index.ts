import { Action } from '@reduxjs/toolkit';
import { doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { Dispatch } from 'react';
import { RootState } from '@store';
import { cartCol, usersCol } from '@src/firebase';
import { CartProduct } from '@features/products/types';

export const addProductToCart = (addedProduct: CartProduct) => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    const uid = getState().user.uid;
    const cartRef = await getDoc(doc(cartCol, uid));
    const cartProduct = { ...addedProduct, cartId: cartRef.id };
    await updateDoc(doc(usersCol, uid), { cart: arrayUnion(cartProduct) });
  };
};
