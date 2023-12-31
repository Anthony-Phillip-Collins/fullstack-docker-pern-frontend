import { useCallback, useState } from 'react';
import userThunk from '../app/features/user.slice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

const useUsers = () => {
  const dispatch = useAppDispatch();
  const { all, status, error } = useAppSelector(({ users }) => users);
  const [initDone, setInitDone] = useState(false);

  const refetch = useCallback(async () => {
    dispatch(userThunk.fetchAll());
  }, [dispatch]);

  const init = useCallback(async () => {
    if (!initDone) {
      setInitDone(true);
      refetch();
    }
  }, [initDone, refetch]);

  return {
    data: all,
    loading: status === 'loading',
    error: error,
    init,
    refetch,
  };
};

export default useUsers;
