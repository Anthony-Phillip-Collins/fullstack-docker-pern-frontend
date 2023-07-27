import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import userThunk from '../app/features/user.slice';

const useUsers = () => {
  const users = useAppSelector(({ users }) => users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userThunk.fetchAll());
  }, [dispatch]);

  return {
    data: users.all,
    loading: users.status === 'loading',
    error: users.error,
  };
};

export default useUsers;
