import { clearNotification, setNotification } from '../app/features/notification.slice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { NotificationType } from '../types/notification.type';

const useNotification = () => {
  const dispatch = useAppDispatch();
  const notification = useAppSelector(({ notification }) => notification);

  const notify = (props: NotificationType | string) => {
    const notification = typeof props === 'string' ? { message: props } : props;
    clear();
    setTimeout(() => {
      dispatch(setNotification(notification));
    }, 100);
  };

  const clear = () => {
    dispatch(clearNotification());
  };

  return {
    notification,
    notify,
    clear,
  };
};

export default useNotification;
