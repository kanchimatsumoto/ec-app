import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import router from 'next/router';
import { auth, FirebaseTimestamp, usersCol } from '@src/firebase';
import { User } from '@features/users/types';

interface SingUpProps {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const signUp = ({ username, email, password }: SingUpProps): (() => Promise<void>) => {
  return async () => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        if (user) {
          const uid = user.uid;
          const timestamp = FirebaseTimestamp.now();

          const userInitialData: User = {
            customer_id: '',
            created_at: timestamp,
            email: email,
            role: 'customer',
            payment_method_id: '',
            uid: uid,
            updated_at: timestamp,
            username: username,
            isSignedIn: true,
            cart: [],
          };
          const userRef = doc(usersCol, uid);
          await setDoc(userRef, userInitialData);
          router.push('/');
        }
      })
      .catch((error) => {
        alert('アカウント登録に失敗しました。もう1度お試しください。');
        console.error(error.message);
      });
  };
};
