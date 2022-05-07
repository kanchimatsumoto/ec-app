import { CartList } from '@src/components/cart/CartList';
import { ArrowLeftBar, CreditCard } from 'tabler-icons-react';
import { useTypedSelector } from '@store';
import { Button } from '@mantine/core';
import { useRouter } from 'next/router';
import { CreditCardKit } from '@components/uikits/CreditCardKit';

const CartLists = () => {
  const cartProducts = useTypedSelector((state) => state.user.cart);
  const router = useRouter();

  return (
    <div className="h-screen bg-gray-300">
      <div className="py-12">
        <div className="mx-auto max-w-md bg-gray-100 rounded-lg shadow-lg  md:max-w-5xl">
          <div className="md:flex ">
            <div className="p-5 w-full">
              <div className="gap-2 md:grid md:grid-cols-3 ">
                <div className="col-span-2 p-5">
                  <h1 className="text-xl font-medium ">Shopping Cart</h1>

                  {cartProducts.map((cartProduct, index) => {
                    return <CartList cartProduct={cartProduct} key={index} />;
                  })}

                  <div className="flex justify-between items-center pt-6 mt-6 border-t">
                    <div className="flex items-center px-4 bg-gray-400">
                      <Button
                        leftIcon={<ArrowLeftBar />}
                        className="mr-4"
                        color="green"
                        onClick={() => router.push('/')}
                      >
                        <span className="font-medium text-md">Go Back</span>
                      </Button>
                      <Button leftIcon={<CreditCard />} className="mr-4">
                        <span className="font-medium text-md">Continue Shopping</span>
                      </Button>
                    </div>

                    <div className="flex justify-center items-end">
                      <span className="mr-1 text-sm font-medium text-gray-400">Subtotal:</span>
                      <span className="text-lg font-bold text-gray-800 "> $24.90</span>
                    </div>
                  </div>
                </div>
                <CreditCardKit />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartLists;
