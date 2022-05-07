// 参考 https://codepen.io/robstinson/pen/VwKLbBz
import { CardContent } from '@components/uikits/CardContent';
import { NativeSelect } from '@mantine/core';
import { Pagination } from '@components/uikits/Pagination';
import { useTypedDispatch, useTypedSelector } from '@store';
import { useRouter } from 'next/router';
import { categories, genders } from '@src/const';
import { useEffect } from 'react';
import { fetchProducts } from '@features/products/fetch';

export const ProductList = () => {
  const dispatch = useTypedDispatch();
  const router = useRouter();
  const { gender, category } = router.query;

  const products = useTypedSelector((state) => state.product.list);

  useEffect(() => {
    dispatch(fetchProducts(gender as string, category as string));
  }, [router.query, dispatch]);

  return (
    <>
      <h1 className="text-3xl">Product List</h1>
      <div className="flex flex-col mt-6 sm:flex-row sm:justify-between sm:items-end">
        <span className="mr-4 text-sm font-semibold">1-16 of 148 Products</span>
        <NativeSelect
          data={categories}
          placeholder="Pick all that you like"
          className="flex justify-between items-center hover:bg-gray-300 rounded border-2 border-gray-300"
        />
        <NativeSelect
          data={genders}
          placeholder="Pick all that you like"
          className="flex justify-between items-center hover:bg-gray-300 rounded border-2 border-gray-300"
        />
      </div>
      {!products ? (
        <h1 className="mt-10">No Product</h1>
      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-12 mt-6 w-full sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {products.map((product, index) => {
            return <CardContent key={index} product={product} />;
          })}
        </div>
      )}
      <Pagination />
    </>
  );
};
