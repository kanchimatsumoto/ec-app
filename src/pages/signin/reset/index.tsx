import { useTypedDispatch } from '@store';
import * as yup from 'yup';
import { LocaleJP } from '@src/locale/validation';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { resetPassword } from '@features/users/reset';
import { SubmitButton, TextInputContainer } from '@components/uikits';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from 'next/link';

type FormValues = {
  email: string;
};

yup.setLocale(LocaleJP);

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

const ResetPassword = () => {
  const dispatch = useTypedDispatch();

  const methods = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    dispatch(resetPassword(data)).then(() => console.log('reset password success'));
  };

  return (
    <section className="px-4 mx-auto mt-6 h-full">
      <div className="flex justify-center content-center items-center h-full">
        <div className="px-4 w-full lg:w-6/12">
          <div className="flex relative flex-col mb-6 w-full min-w-0 break-words bg-gray-300 rounded-lg border-0 shadow-lg">
            <div className="p-6 mb-0 rounded-t">
              <div className="mb-3 text-center">
                <h6 className="text-lg font-bold text-gray-600">Forgot Your Password?</h6>
                <small className="pt-3 mb-3 font-bold text-gray-500">
                  We get it, stuff happens. <br />
                  Just enter your email address below and we will send you a link to reset your
                  password!
                </small>
              </div>
              <div className="flex-auto px-4 pt-0 lg:px-10">
                <FormProvider {...methods}>
                  <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <TextInputContainer name="email" label="EMAIL" type="email" required={true} />
                    <SubmitButton text="RESET PASSWORD" />
                  </form>
                </FormProvider>
                <div className="flex justify-center space-x-4">
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

export default ResetPassword;
