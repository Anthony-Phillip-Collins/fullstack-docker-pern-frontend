import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import blogThunk from '../app/features/blog.slice';
import { BlogAttributes } from '../types/blog.type';

const useBlogById = (id: BlogAttributes['id']) => {
  const { one, status, error } = useAppSelector(({ blogs }) => blogs);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(blogThunk.fetchOne(id));
  }, [dispatch, id]);

  return {
    data: one,
    loading: status === 'loading',
    error,
  };
};

export default useBlogById;
