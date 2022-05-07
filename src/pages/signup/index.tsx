import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextInputContainer } from '@components/uikits/TextInput/TextInputContainer';
import { SubmitButton } from '@components/uikits';
import { LocaleJP } from '@src/locale/validation';
import { signUp } from '@features/users/signup';
import { useTypedDispatch } from '@store';
import { signInWithGoogle } from '@features/users/signin';

type FormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
};

yup.setLocale(LocaleJP);

const schema = yup.object().shape({
  email: yup.string().email().required(),
  username: yup.string().required(),
  password: yup.string().min(4).max(20).required(),
  confirmPassword: yup
    .string()
    .min(4)
    .max(20)
    .required()
    .oneOf([yup.ref('password')], 'パスワードが一致しません。'),
});

// 参考: https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/login ログインページモック
const SignUp = () => {
  const dispatch = useTypedDispatch();

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      username: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(signUp(data)).then(() => console.log('sign up success'));
  };

  return (
    <section className="px-4 mx-auto mt-6 h-full">
      <div className="flex justify-center content-center items-center h-full">
        <div className="px-4 w-full lg:w-6/12">
          <div className="flex relative flex-col mb-6 w-full min-w-0 break-words bg-gray-300 rounded-lg border-0 shadow-lg">
            <div className="p-6 mb-0 rounded-t">
              <div className="mb-3 text-center">
                <h6 className="text-sm font-bold text-gray-600">Sign up with</h6>
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
                  <small>Or sign up with credentials</small>
                </div>
                <FormProvider {...methods}>
                  <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <TextInputContainer
                      name="username"
                      label="USERNAME"
                      type="text"
                      required={true}
                    />
                    <TextInputContainer name="email" label="EMAIL" type="email" required={true} />
                    <TextInputContainer
                      name="password"
                      label="PASSWORD"
                      type="password"
                      required={true}
                    />
                    <TextInputContainer
                      name="confirmPassword"
                      label="CONFIRM PASSWORD"
                      type="password"
                      required={true}
                    />
                    <SubmitButton text="SIGN UP" />
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

export default SignUp;
