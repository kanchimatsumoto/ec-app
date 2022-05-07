import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextInputContainer } from '@components/uikits/TextInput/TextInputContainer';
import { SubmitButton } from '@components/uikits';
import { LocaleJP } from '@src/locale/validation';
import { useTypedDispatch } from '@store';
import { signIn, signInWithGoogle } from '@features/users/signin';
import Link from 'next/link';

type FormValues = {
  email: string;
  password: string;
};

yup.setLocale(LocaleJP);

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(4).max(20).required(),
});

// 参考: https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/login ログインページモック
const SignIn = () => {
  const dispatch = useTypedDispatch();

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(signIn(data)).then(() => console.log('sign in success'));
  };

  return (
    <section className="px-4 mx-auto mt-6 h-full">
      <div className="flex justify-center content-center items-center h-full">
        <div className="px-4 w-full lg:w-6/12">
          <div className="flex relative flex-col mb-6 w-full min-w-0 break-words bg-gray-300 rounded-lg border-0 shadow-lg">
            <div className="p-6 mb-0 rounded-t">
              <div className="mb-3 text-center">
                <h6 className="text-sm font-bold text-gray-600">Sign in with</h6>
              </div>
              <div className="text-center btn-wrapper">
                <button
                  className="inline-flex items-center py-2 px-4 mr-2 mb-1 text-xs font-bold
                             text-gray-800 uppercase bg-white active:bg-gray-100 rounded outline-none focus:outline-none shadow hover:shadow-md"
                  type="button"
                  style={{ transition: 'all .15s ease' }}
                  onClick={signInWithGoogle}
                >
                  <img alt="..." className="mr-1 w-5" src="/google.svg" />
                  Google
                </button>
                <hr className="mt-6 border-gray-400 border-b-1" />
              </div>
              <div className="flex-auto px-4 pt-0 lg:px-10">
                <div className="mb-3 font-bold text-center text-gray">
                  <small>Or sign in with credentials</small>
                </div>
                <FormProvider {...methods}>
                  <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <TextInputContainer name="email" label="EMAIL" type="email" required={true} />
                    <TextInputContainer
                      name="password"
                      label="PASSWORD"
                      type="password"
                      required={true}
                    />
                    <SubmitButton text="SIGN IN" />
                  </form>
                </FormProvider>
                <div className="flex justify-center space-x-4">
                  <Link href="/signin/reset">
                    <a className="pt-3 mb-3 font-bold hover:text-purple-400 text-gray">
                      <small>Forgot Your Password?</small>
                    </a>
                  </Link>
                  <Link href="/signup">
                    <a className="pt-3 mb-3 font-bold hover:text-purple-400 text-gray">
                      <small>Create New Account!</small>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignIn;
