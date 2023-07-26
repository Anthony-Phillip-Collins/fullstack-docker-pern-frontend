import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import blogThunk from '../app/features/blog.slice';

const useBlogs = () => {
  const blogs = useAppSelector(({ blogs }) => blogs);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(blogThunk.fetchAll());
  }, [dispatch]);

  return {
    data: blogs.all,
    loading: blogs.status === 'loading',
    error: blogs.error,
  };
};

export default useBlogs;
