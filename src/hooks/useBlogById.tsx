import { useEffect } from 'react';
import blogThunk, { getOneBlogPopulated } from '../app/features/blog.slice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { BlogAttributes } from '../types/blog.type';

const useBlogById = (id: BlogAttributes['id']) => {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector(({ blogs }) => blogs);
  const data = useAppSelector((state) => {
    const id = state.blogs.one?.id;
    return id ? getOneBlogPopulated(state, id) : state.blogs.one;
  });

  useEffect(() => {
    dispatch(blogThunk.fetchOne(id));
  }, [dispatch, id]);

  return {
    data,
    loading: status === 'loading',
    error,
  };
};

export default useBlogById;
