import { auth } from '@src/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import router from 'next/router';

type Props = {
  email: string;
};

export const resetPassword = ({ email }: Props) => {
  return async () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert('パスワードリセット用のメールを送信しました。');
        router.push('/signin');
      })
      .catch(() => {
        alert('パスワードリセット用のメールの送信に失敗しました。');
      });
  };
};
