import { useCallback, useState } from 'react';
import authThunk from '../app/features/auth.slice';
import { getAuthUserPopulated } from '../app/features/user.slice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { UserCreateInput, UserLogin } from '../types/user.type';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector(({ auth }) => auth);
  const user = useAppSelector((state) => getAuthUserPopulated(state));
  const [initDone, setInitDone] = useState(false);

  const logIn = async (credentials: UserLogin) => {
    return dispatch(authThunk.logIn(credentials)).unwrap();
  };

  const logOut = async () => {
    return dispatch(authThunk.logOut()).unwrap();
  };

  const signUp = async (credentials: UserCreateInput) => {
    return dispatch(authThunk.signUp(credentials)).unwrap();
  };

  const init = useCallback(async () => {
    if (!initDone) {
      setInitDone(true);
      dispatch(authThunk.fetchAuthUser());
    }
  }, [initDone, dispatch]);

  return {
    user,
    loading: status === 'loading',
    error,
    logIn,
    logOut,
    signUp,
    init,
  };
};

export default useAuth;
