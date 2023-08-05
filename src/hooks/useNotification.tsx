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

  const notifyAsync = async (promise: Promise<unknown>, message: string): Promise<typeof promise> => {
    try {
      let payload;
      if ('unwrap' in promise && promise.unwrap instanceof Function) {
        payload = await promise.unwrap();
      } else {
        payload = await promise;
      }
      notify(message);
      return payload;
    } catch (error) {
      notify({ error });
    }
  };

  const clear = () => {
    dispatch(clearNotification());
  };

  return {
    notification,
    notify,
    notifyAsync,
    clear,
  };
};

export default useNotification;
