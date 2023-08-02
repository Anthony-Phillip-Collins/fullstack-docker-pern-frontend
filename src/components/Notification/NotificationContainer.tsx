import useNotification from '../../hooks/useNotification';
import Notification from './Notification';

function NotificationContainer() {
  const { notification } = useNotification();
  return <Notification {...notification} />;
}

export default NotificationContainer;
