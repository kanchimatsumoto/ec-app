import { IconContext } from 'react-icons';
import { MdShoppingCart } from 'react-icons/md';
import { useTypedDispatch, useTypedSelector } from '@store';
import { Indicator } from '@mantine/core';
import { Burger, Drawer } from '@mantine/core';
import { useEffect, useState } from 'react';
import { ClosableDrawer } from '@components/Header/ClosableDrawer';
import { cartCol, firestore, usersCol } from '@src/firebase';
import { collection, getDocs, onSnapshot, getDoc, doc, query } from '@firebase/firestore';
import { fetchProductInCart } from '@features/users/fetchProductInCart';
import { CartProduct, Product, Size, UploadImage } from '@features/products/types';
import { where } from '@firebase/firestore/lite';
import { useRouter } from 'next/router';

// 参考
// https://zenn.dev/taichifukumoto/articles/how-to-use-react-icons アイコンサイズ
// https://daisyui.com/components/navbar/#navbar-with-icon-indicator-and-dropdown カート
export const HeaderMenu = () => {
  const [opened, setOpened] = useState(false);
  const router = useRouter();
  const title = opened ? 'Close navigation' : 'Open navigation';
  const dispatch = useTypedDispatch();
  const userId = useTypedSelector((state) => state.user.uid);
  const cartProducts = useTypedSelector((state) => state.user.cart);

  useEffect(() => {
    dispatch(fetchProductInCart(userId));
  }, []);

  return (
    <IconContext.Provider value={{ color: '#ccc', size: '24px' }}>
      <div className="hidden w-full md:flex md:w-auto">
        <ul className="items-center pt-4 text-base text-white md:flex md:justify-between md:pt-0">
          <li>
            <button onClick={() => router.push('/cart')}>
              <div className="block py-2 hover:text-purple-400 md:p-4">
                <Indicator inline color="pink" label={cartProducts.length} size={16}>
                  <MdShoppingCart />
                </Indicator>
              </div>
            </button>
          </li>
          <li>
            <ClosableDrawer opened={opened} setOpened={setOpened} />
            <button>
              <div className="block py-2 hover:text-purple-400 md:p-4">
                <Burger opened={opened} onClick={() => setOpened((o) => !o)} title={title} />
              </div>
            </button>
          </li>
        </ul>
      </div>
    </IconContext.Provider>
  );
};
