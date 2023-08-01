import { useEffect } from 'react';
import blogThunk from '../app/features/blog.slice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

const useBlogs = () => {
  const dispatch = useAppDispatch();
  const { all, status, error } = useAppSelector(({ blogs }) => blogs);

  useEffect(() => {
    dispatch(blogThunk.fetchAll());
  }, [dispatch]);

  return {
    data: all,
    loading: status === 'loading',
    error,
  };
};

export default useBlogs;
