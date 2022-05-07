import { Action } from '@reduxjs/toolkit';
import { signInAction } from '@src/features/users/slice';
import { doc, getDoc } from 'firebase/firestore';
import router from 'next/router';
import { Dispatch } from 'react';
import { auth, usersCol } from '../../../firebase/index';

export const listenAuthState = () => {
  return async (dispatch: Dispatch<Action>) => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;

        return getDoc(doc(usersCol, uid)).then((snapshot) => {
          const data = snapshot.data();
          if (!data) {
            console.error('ユーザーデータが存在しません');
          }

          dispatch(
            signInAction({
              isSignedIn: true,
              role: data?.role ? data.role : '',
              uid: uid,
              username: data?.username ? data.username : '',
              email: data?.email ? data.email : '',
              cart: [],
            }),
          );
        });
      } else {
        router.push('/signin');
      }
    });
  };
};
