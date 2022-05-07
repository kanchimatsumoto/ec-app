import { productsCol } from '@src/firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import { Dispatch } from 'react';
import { Action } from '@reduxjs/toolkit';
import { deleteProductAction } from '@features/products/slice';
import { RootState } from '@store';

export const deleteProduct = (id: string) => {
  return async (dispatch: Dispatch<Action>, getState: () => RootState) => {
    deleteDoc(doc(productsCol, id)).then(() => {
      const prevProducts = getState().product.list;
      const nextProducts = prevProducts?.filter((product) => product.id !== id);
      dispatch(deleteProductAction(nextProducts));
    });
  };
};
