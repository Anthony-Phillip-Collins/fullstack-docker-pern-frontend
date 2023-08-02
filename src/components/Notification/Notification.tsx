import cn from 'classnames';
import styles from './Notification.module.css';
import { NotificationType } from '../../types/notification.type';
import { parseError } from '../../types/utils/parsers/error.parser';

type Props = NotificationType;

function Notification({ message, error }: Props) {
  const err = parseError(error);
  const msg = err?.message || message;
  return (
    <>
      <h1>Notification:</h1>
      {msg && <div className={cn(styles.notification, !!err && styles.error)}>{msg}</div>}
    </>
  );
}

export default Notification;
