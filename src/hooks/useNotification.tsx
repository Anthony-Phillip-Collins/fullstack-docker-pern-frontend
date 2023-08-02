import { useCallback } from 'react';
import { clearNotification, setNotification } from '../app/features/notification.slice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { NotificationType } from '../types/notification.type';

const useNotification = () => {
  const dispatch = useAppDispatch();
  const notification = useAppSelector(({ notification }) => notification);

  const notify = (props: NotificationType) => {
    dispatch(setNotification(props));
  };

  const clear = useCallback(() => {
    dispatch(clearNotification());
  }, [dispatch]);

  return {
    notification,
    notify,
    clear,
  };
};

export default useNotification;
