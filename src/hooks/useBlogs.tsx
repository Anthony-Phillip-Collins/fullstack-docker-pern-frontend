import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import blogThunk from '../app/features/blog.slice';

const useBlogs = () => {
  const { all, status, error } = useAppSelector(({ blogs }) => blogs);
  const dispatch = useAppDispatch();

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
