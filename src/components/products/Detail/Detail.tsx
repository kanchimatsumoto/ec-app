import { Product, Size } from '@features/products/types';
import { Table, Paper, Text, Title, Image } from '@mantine/core';
import { HeartPlus, ShoppingCart } from 'tabler-icons-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { CartAddDialog } from '@components/uikits/CartAddDialog';

export const ProductDetailUI = ({
  product,
  addProduct,
}: {
  product: Product;
  addProduct: (selectedSize: Size) => void;
}) => {
  const hasImage = product.images && product.images?.length > 0;
  const hasMultipleImages = product.images && product.images?.length > 1;
  const imageUrl = product.images && product.images?.length > 0 ? product.images[0].url : '';

  const rows = product.sizes.map((size, index) => (
    <tr key={index}>
      <td>{size.size}</td>
      <td>残り{size.quantity}</td>
      <td>
        <HeartPlus />
      </td>
      <td onClick={() => addProduct(size)}>
        <CartAddDialog />
      </td>
    </tr>
  ));

  return (
    <div className="flex overflow-hidden relative items-center p-5 min-h-screen lg:p-10 min-w-screen">
      <div className="relative p-10 mx-auto w-full max-w-6xl text-gray-800 bg-teal-500 rounded shadow-xl md:text-left lg:p-20">
        <div className="items-center -mx-10 md:flex">
          <div className="px-10 mb-10 w-full md:mb-0 md:w-1/2">
            <div className="relative">
              <Swiper
                spaceBetween={50}
                slidesPerView={1}
                initialSlide={1}
                loop={true}
                navigation={{
                  prevEl: '.button_prev',
                  nextEl: '.button_next',
                }}
                scrollbar={{ draggable: true }}
                pagination={{
                  el: '.swiper-pagination',
                  type: 'bullets',
                  clickable: true,
                  dynamicBullets: true,
                }}
              >
                {hasImage &&
                  product.images?.map((image, index) => {
                    return (
                      <SwiperSlide key={index}>
                        <Image
                          width={500}
                          height={800}
                          radius="md"
                          withPlaceholder
                          src={image.url}
                          className="relative z-10 w-full h-[600px]"
                          alt="no images"
                        />
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
          </div>
          <div className="px-10 w-full md:w-1/2">
            <Title order={3} className="mb-2">
              SIZES
            </Title>
            <Table highlightOnHover>
              <thead>
                <tr>
                  <th>SIZE</th>
                  <th>QUANTITY</th>
                  <th>FAVORITE</th>
                  <th>ADD</th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
            <div className="my-10">
              <Title order={3} className="mb-2">
                DESCRIPTION
              </Title>
              <Paper shadow="xs" p="md" className="bg-gray-200">
                <Text>{product.description}</Text>
              </Paper>
            </div>
            <div>
              <div className="inline-block mr-5 align-bottom">
                <span className="text-2xl leading-none align-baseline">$</span>
                <span className="text-5xl font-bold leading-none align-baseline">
                  {Number(product.price).toLocaleString('jp-JP')}
                </span>
              </div>
              <div className="inline-block align-bottom">
                <button className="py-2 px-10 font-semibold text-yellow-900 hover:text-gray-900 bg-yellow-300 rounded-full opacity-75 hover:opacity-100">
                  BUY NOW
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
