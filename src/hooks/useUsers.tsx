import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import userThunk from '../app/features/user.slice';

const useUsers = () => {
  const { all, status, error } = useAppSelector(({ users }) => users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userThunk.fetchAll());
  }, [dispatch]);

  return {
    data: all,
    loading: status === 'loading',
    error: error,
  };
};

export default useUsers;
