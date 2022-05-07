import { CartProduct } from '@features/products/types';
import { Image } from '@mantine/core';

export const CartList = ({ cartProduct }: { cartProduct: CartProduct }) => {
  const imageUrl =
    cartProduct.images && cartProduct.images?.length > 0 ? cartProduct.images[0].url : '';
  return (
    <div className="flex justify-between items-center pt-6 mt-6 flex-col-3">
      <div className="flex items-center mr-6 w-96">
        <Image
          src={imageUrl}
          radius="xl"
          alt="With default placeholder"
          withPlaceholder
          fit="cover"
          caption={cartProduct.name}
        />
      </div>

      <div className="flex justify-center items-center">
        <div className="flex pr-8">
          <span className="font-semibold">-</span>
          <input
            type="text"
            className="px-2 mx-2 w-8 h-6 text-sm bg-gray-100 rounded border focus:outline-none"
            value="1"
          />
          <span className="font-semibold">+</span>
        </div>

        <div className="pr-8">
          <span className="text-xs font-medium">
            $ {Number(cartProduct.price).toLocaleString('jp-JP')}
          </span>
        </div>
        <div>
          <i className="text-xs font-medium fa fa-close"></i>
        </div>
      </div>
    </div>
  );
};
