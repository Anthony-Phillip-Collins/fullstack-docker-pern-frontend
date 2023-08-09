import { useCallback, useState } from 'react';
import blogThunk from '../app/features/blog.slice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

const useBlogs = () => {
  const dispatch = useAppDispatch();
  const { all, status, error } = useAppSelector(({ blogs }) => blogs);
  const [initDone, setInitDone] = useState(false);

  const refetch = useCallback(async () => {
    dispatch(blogThunk.fetchAll());
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
    error,
    init,
    refetch,
  };
};

export default useBlogs;
