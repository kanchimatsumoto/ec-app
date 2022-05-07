import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {
  collection,
  CollectionReference,
  doc,
  DocumentData,
  getFirestore,
  Timestamp,
} from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getStorage } from 'firebase/storage';
import { firebaseConfig } from './config';
import { CartProduct, Product } from '@features/products/types';
import { User } from '@features/users/types';

const firebaseApp: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
export const functions = getFunctions(firebaseApp);

export const FirebaseTimestamp = Timestamp;

export const createCollection = <T = DocumentData>(
  collectionName: string,
  subCollection?: string,
) => {
  return collection(firestore, collectionName) as CollectionReference<T>;
};

export const usersCol = createCollection<User>('users');
export const productsCol = createCollection<Product>('products');
export const cartCol = createCollection<CartProduct>('users', 'cart');
export const ordersCol = createCollection<any>('users', 'orders');
