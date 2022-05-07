import { listenAuthState } from '@src/features/users/listen';
import { useTypedDispatch, useTypedSelector } from '@src/store';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Auth = ({ children }: any): JSX.Element => {
  const dispatch = useTypedDispatch();

  const { isSignedIn } = useTypedSelector((state) => state.user);

  useEffect(() => {
    if (!isSignedIn) {
      dispatch(listenAuthState());
    }
  }, [dispatch, isSignedIn]);

  if (!isSignedIn) {
    return <></>;
  } else {
    return children;
  }
};

export default Auth;
