import { Action } from '@reduxjs/toolkit';
import { auth } from '@src/firebase';
import { signOut } from 'firebase/auth';
import router from 'next/router';
import { Dispatch } from 'react';
import { signOutAction } from '@features/users/slice';

export const signOutFunc = () => {
  return async (dispatch: Dispatch<Action>) => {
    return signOut(auth).then(() => {
      dispatch(signOutAction());
      router.push('/');
    });
  };
};
