import { useEffect } from 'react';
import userThunk from '../app/features/user.slice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { UserAttributes } from '../types/user.type';

const useBlogById = (id: UserAttributes['id']) => {
  const { one, status, error } = useAppSelector(({ users }) => users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userThunk.fetchOne(id));
  }, [dispatch, id]);

  return {
    data: one,
    loading: status === 'loading',
    error,
  };
};

export default useBlogById;
