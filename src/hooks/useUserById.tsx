import { useEffect } from 'react';
import userThunk, { getOneUserPopulated } from '../app/features/user.slice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { UserAttributes } from '../types/user.type';

const useUserById = (id: UserAttributes['id']) => {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector(({ users }) => users);
  const data = useAppSelector((state) => {
    const id = state.users.one?.id;
    return id ? getOneUserPopulated(state, id) : state.users.one;
  });

  useEffect(() => {
    dispatch(userThunk.fetchOne(id));
  }, [dispatch, id]);

  return {
    data,
    loading: status === 'loading',
    error,
  };
};

export default useUserById;
