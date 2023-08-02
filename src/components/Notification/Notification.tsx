import { clearNotification } from '../../app/features/notification.slice';
import { useAppDispatch } from '../../app/hooks';
import { NotificationType } from '../../types/notification.type';
import { parseError } from '../../types/utils/parsers/error.parser';
import IconButton from '../IconButton/IconButton';
import { Message, StyledNotification } from './Notification.styled';

type Props = NotificationType;

function Notification({ message, error }: Props) {
  const dispatch = useAppDispatch();
  const err = parseError(error);
  const msg = err?.message || message;
  return (
    <>
      {/* {msg && <div className={cn(styles.notification, !!err && styles.error)}>{msg}</div>} */}
      {msg && (
        <StyledNotification error={!!error}>
          <Message>{msg}</Message>
          <IconButton
            iconProps={{ icon: 'close' }}
            noBorder
            onClick={() => {
              dispatch(clearNotification());
            }}
            aria-label="Close notification"
          />
        </StyledNotification>
      )}{' '}
    </>
  );
}

export default Notification;
