import { auth, FirebaseTimestamp, productsCol, storage } from '@src/firebase';
import { doc, setDoc } from 'firebase/firestore';
import router from 'next/router';
import { useCallback, useState } from 'react';
import { Product, UploadImage } from '@features/products/types';
import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';

export const saveProduct = ({
  id = '',
  name,
  description,
  category,
  gender,
  price,
  sizes = [],
  images,
}: Product) => {
  return async () => {
    const timeStamp = FirebaseTimestamp.now();

    let productDocId;

    if (!id) {
      const ref = doc(productsCol);
      productDocId = ref.id;
    } else {
      productDocId = id;
    }

    const data = {
      id: productDocId,
      category,
      description,
      gender,
      name,
      price,
      sizes,
      images,
      updated_at: timeStamp,
    };

    return setDoc(doc(productsCol, productDocId), data)
      .then(() => {
        router.push('/');
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
};
