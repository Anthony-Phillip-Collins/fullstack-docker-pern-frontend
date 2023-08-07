import { useCallback, useState } from 'react';
import authThunk, { getAuthUser } from '../app/features/auth.slice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { UserCreateInput, UserLogin } from '../types/user.type';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const [initDone, setInitDone] = useState(false);
  const { status, error } = useAppSelector(({ auth }) => auth);

  const user = useAppSelector((state) => getAuthUser(state));

  const logIn = async (credentials: UserLogin) => {
    return dispatch(authThunk.logIn(credentials)).unwrap();
  };

  const logOut = async () => {
    return dispatch(authThunk.logOut()).unwrap();
  };

  const signUp = async (credentials: UserCreateInput) => {
    return dispatch(authThunk.signUp(credentials)).unwrap();
  };

  const refresh = async () => {
    return dispatch(authThunk.refresh()).unwrap();
  };

  const init = useCallback(async () => {
    if (!initDone) {
      dispatch(authThunk.refresh());
    }
    setInitDone(true);
  }, [dispatch, initDone]);

  return {
    user,
    loading: status === 'loading',
    error,
    logIn,
    logOut,
    signUp,
    refresh,
    init,
  };
};

export default useAuth;
