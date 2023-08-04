import { clearNotification } from '../../app/features/notification.slice';
import { useAppDispatch } from '../../app/hooks';
import { NotificationType } from '../../types/notification.type';
import { parseError } from '../../types/utils/parsers/error.parser';
import IconButton from '../IconButton/IconButton';
import { Message, NotificationInner, StyledNotification } from './Notification.styled';

export interface NotificationInnerProps {
  error: boolean;
}

type Props = NotificationType;

function Notification({ message, error }: Props) {
  const dispatch = useAppDispatch();
  const err = parseError(error);
  const msg = err?.message || message;
  return (
    <>
      {msg && (
        <StyledNotification>
          <NotificationInner error={!!error}>
            <Message>{msg}</Message>
            <IconButton
              iconProps={{ icon: 'close' }}
              noBorder
              onClick={() => {
                dispatch(clearNotification());
              }}
              aria-label="Close notification"
            />
          </NotificationInner>
        </StyledNotification>
      )}
    </>
  );
}

export default Notification;
