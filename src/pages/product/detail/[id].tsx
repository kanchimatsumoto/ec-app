import { useTypedDispatch } from '@store';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { FirebaseTimestamp, productsCol } from '@src/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { Product, Size } from '@features/products/types';
import { addProductToCart } from '@features/products/add';
import { ProductDetailUI } from '@components/products/Detail/Detail';

const initialProductDetailState: Product = {
  description: '',
  gender: '',
  images: [],
  name: '',
  price: '',
  sizes: [],
  category: '',
};

const ProductDetail = () => {
  const [product, setProduct] = useState<Product>(initialProductDetailState);
  const dispatch = useTypedDispatch();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
    const docRef = doc(productsCol, id as string);
    getDoc(doc(productsCol, id as string)).then((doc) => {
      const data = doc.data();
      if (!data) return;
      setProduct(data);
    });
  }, [id]);

  const addProduct = useCallback(
    (selectedSize: Size) => {
      const timestamp = FirebaseTimestamp.now();
      dispatch(
        addProductToCart({
          added_at: timestamp,
          description: product.description,
          gender: product.gender,
          images: product.images,
          name: product.name,
          price: product.price,
          productId: product.id!,
          quantity: 1,
          size: selectedSize,
          cartId: '',
        }),
      ).then(() => console.log('add cart success'));
    },
    [product],
  );

  return <ProductDetailUI product={product} addProduct={addProduct} />;
};

export default ProductDetail;
