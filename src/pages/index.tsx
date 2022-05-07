import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Auth from '@src/components/auth';
import { signOutFunc } from '@pages/../features/users/signout';
import { useTypedDispatch, useTypedSelector } from '@store';
import { ProductList } from '@components/products/List';

const Home: NextPage = () => {
  const dispatch = useTypedDispatch();
  const user = useTypedSelector((state) => state.user);

  const handleSubmit = () => {
    dispatch(signOutFunc());
  };

  return (
    <Auth>
      <div className={styles.container}>
        <main className={styles.main}>
          <ProductList />
        </main>
      </div>
    </Auth>
  );
};

export default Home;
