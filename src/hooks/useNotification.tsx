import { useRef } from 'react';
import { clearNotification, setNotification } from '../app/features/notification.slice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { NotificationType } from '../types/notification.type';

const useNotification = () => {
  const dispatch = useAppDispatch();
  const notification = useAppSelector(({ notification }) => notification);
  const timeoutA = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timeoutB = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setTimeoutToClear = () => {
    timeoutA.current = setTimeout(() => dispatch(clearNotification()), 5000);
  };

  const notify = (props: NotificationType | string) => {
    const notification = typeof props === 'string' ? { message: props } : props;
    clear();
    // add short timeout so that notification can hide and slide in again
    timeoutB.current = setTimeout(() => {
      dispatch(setNotification(notification));
      setTimeoutToClear();
    }, 100);
  };

  const clear = () => {
    timeoutA.current && clearTimeout(timeoutA.current);
    timeoutB.current && clearTimeout(timeoutB.current);
    dispatch(clearNotification());
  };

  return {
    notification,
    notify,
    clear,
  };
};

export default useNotification;
