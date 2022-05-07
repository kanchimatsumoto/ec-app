import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextInputContainer } from '@components/uikits/TextInput/TextInputContainer';
import { SubmitButton } from '@components/uikits';
import { LocaleJP } from '@src/locale/validation';
import { useTypedDispatch } from '@store';
import { TextAreaContainer } from '@components/uikits/TextArea/TextAreaContainer';
import { SelectBoxContainer } from '@components/uikits/SelectBox/SelectBoxContainer';
import { SetSizeAreaContainer } from '@src/components/uikits/SetSizeArea/SetSizeAreaContainer';
import { saveProduct } from '@features/products/save';
import { ImageAreaContainer } from '@components/products/ImageArea';
import { UploadImage } from '@features/products/types';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { productsCol } from '@src/firebase';
import { useRouter } from 'next/router';

type Size = {
  size: string;
  quantity: number;
};

type FormValues = {
  name: string;
  description: string;
  category: string;
  gender: string;
  price: string;
  sizes: Size[];
  images: UploadImage[];
};

yup.setLocale(LocaleJP);

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  category: yup.string().required(),
  gender: yup.string().required(),
  price: yup.string().required(),
});

// 参考: https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/login ログインページモック
const EditProduct = () => {
  const [selectedFiles, setSelectedFile] = useState<UploadImage[]>([]);
  const [id, setId] = useState('');
  const router = useRouter();
  const dispatch = useTypedDispatch();

  const categories: {
    id: string;
    name: string;
    selected?: boolean;
  }[] = [
    { id: 'tops', name: 'すべて', selected: true },
    { id: 'shirts', name: 'シャツ' },
    { id: 'pants', name: 'パンツ' },
  ];

  const genders: {
    id: string;
    name: string;
    selected?: boolean;
  }[] = [
    { id: 'all', name: 'すべて', selected: true },
    { id: 'male', name: 'メンズ' },
    { id: 'female', name: 'レディース' },
  ];

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      category: '',
      gender: '',
      price: '',
      sizes: [{ size: 'S', quantity: 1 }],
      images: [],
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const requestData = { ...data, id, images: selectedFiles };
    await dispatch(saveProduct(requestData));
  };

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      setId(id as string);
      const productRef = doc(productsCol, id as string);
      getDoc(productRef).then((querySnapshot) => {
        const data = querySnapshot.data();
        methods.setValue('name', data?.name ?? '');
        methods.setValue('description', data?.description ?? '');
        methods.setValue('price', data?.price ?? '');
        methods.setValue('category', data?.category ?? '');
        methods.setValue('gender', data?.gender ?? '');
        methods.setValue('sizes', data?.sizes ?? []);
        setSelectedFile(data?.images ?? []);
      });
    }
  }, [router, methods]);

  return (
    <section className="px-4 mx-auto mt-6 h-full">
      <div className="flex justify-center content-center items-center h-full">
        <div className="px-4 w-full lg:w-6/12">
          <div className="flex relative flex-col mb-6 w-full min-w-0 break-words bg-gray-300 rounded-lg border-0 shadow-lg">
            <div className="p-6 mb-0 rounded-t">
              <div className="flex-auto px-4 pt-0 lg:px-10">
                <div className="mb-3 font-bold text-center text-gray">
                  <h2>Edit Product</h2>
                </div>
                <FormProvider {...methods}>
                  <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <ImageAreaContainer
                      name="images"
                      label="IMAGES"
                      selectedFiles={selectedFiles}
                      setSelectedFile={setSelectedFile}
                    />
                    <TextInputContainer name="name" label="NAME" type="text" required={true} />
                    <TextAreaContainer name="description" label="DESCRIPTION" required={true} />
                    <SelectBoxContainer
                      name="category"
                      label="CATEGORY"
                      options={categories}
                      required={true}
                    />
                    <SelectBoxContainer
                      name="gender"
                      label="GENDER"
                      options={genders}
                      required={true}
                    />
                    <TextInputContainer name="price" label="PRICE" type="number" required={true} />
                    <SetSizeAreaContainer name="sizes" required={false} />
                    <SubmitButton text="EDIT" />
                  </form>
                </FormProvider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProduct;
