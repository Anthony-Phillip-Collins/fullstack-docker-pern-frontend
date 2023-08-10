import { useCallback, useState } from 'react';
import { getBookmarksOfAuthUser } from '../app/features/blog.slice';
import readingThunk from '../app/features/reading.slice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

const useReadings = () => {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector(({ readings }) => readings);
  const all = useAppSelector((state) => getBookmarksOfAuthUser(state));
  const read = useAppSelector((state) => getBookmarksOfAuthUser(state, true));
  const unread = useAppSelector((state) => getBookmarksOfAuthUser(state, false));
  const [initDone, setInitDone] = useState(false);

  const refetch = useCallback(async () => {
    dispatch(readingThunk.fetchAll());
  }, [dispatch]);

  const init = useCallback(async () => {
    if (!initDone) {
      setInitDone(true);
      refetch();
    }
  }, [initDone, refetch]);

  return {
    all,
    read,
    unread,
    loading: status === 'loading',
    error,
    init,
    refetch,
  };
};

export default useReadings;
