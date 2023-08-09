import { useCallback, useState } from 'react';
import readingThunk from '../app/features/reading.slice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getBookmarksOfAuthUser } from '../app/features/blog.slice';

const useReadings = () => {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector(({ readings }) => readings);
  const allPopulated = useAppSelector((state) => getBookmarksOfAuthUser(state));
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
    data: allPopulated,
    loading: status === 'loading',
    error,
    init,
    refetch,
  };
};

export default useReadings;
