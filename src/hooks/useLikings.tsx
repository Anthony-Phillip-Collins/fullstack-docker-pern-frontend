import { useCallback, useState } from 'react';
import likeThunk from '../app/features/like.slice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getLikingsOfAuthUser } from '../app/features/blog.slice';

const useLikings = () => {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector(({ likings }) => likings);
  const all = useAppSelector((state) => getLikingsOfAuthUser(state));
  const [initDone, setInitDone] = useState(false);

  const refetch = useCallback(async () => {
    dispatch(likeThunk.fetchAll());
  }, [dispatch]);

  const init = useCallback(async () => {
    if (!initDone) {
      setInitDone(true);
      refetch();
    }
  }, [initDone, refetch]);

  return {
    all,
    loading: status === 'loading',
    error,
    init,
    refetch,
  };
};

export default useLikings;
