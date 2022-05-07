import { Action } from '@reduxjs/toolkit';
import { signInAction } from '@src/features/users/slice';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import router from 'next/router';
import { Dispatch } from 'react';
import { auth, usersCol } from '@src/firebase';
import { GoogleAuthProvider } from 'firebase/auth';

interface SignInProps {
  email: string;
  password: string;
}

export const signIn = ({ email, password }: SignInProps) => {
  return async (dispatch: Dispatch<Action>) => {
    return signInWithEmailAndPassword(auth, email, password).then(async (userCredential) => {
      const userState = userCredential.user;

      if (!userState) {
        console.error('ユーザーIDを取得できません');
      }

      const uid = userState.uid;

      return getDoc(doc(usersCol, uid))
        .then((snapshot) => {
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
          router.push('/');
        })
        .catch((error) => {
          alert('ログインに失敗しました。もう1度お試しください。');
          console.error(error.message);
        });
    });
  };
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  await signInWithPopup(auth, provider)
    .then((result) => {
      console.log(`Google認証でログイン成功しました`);
      router.push('/');
    })
    .catch((error) => {
      console.error(error.message);
    });
};
