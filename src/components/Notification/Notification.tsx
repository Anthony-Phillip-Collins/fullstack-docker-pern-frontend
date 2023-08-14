import { clearNotification } from '../../app/features/notification.slice';
import { useAppDispatch } from '../../app/hooks';
import { NotificationType } from '../../types/notification.type';
import { parseFrontendError } from '../../util/frontendErrorParser';
import IconButton from '../IconButton/IconButton';
import NotificationStyled from './Notification.styled';

export interface NotificationInnerProps {
  error: boolean;
}

type Props = NotificationType;

const Styled = NotificationStyled;

function Notification({ message, error }: Props) {
  const dispatch = useAppDispatch();
  const err = parseFrontendError(error);
  const msg = err?.message || message;
  return (
    <>
      {msg && (
        <Styled.Notification>
          <Styled.Inner error={!!error}>
            <Styled.Message>{msg}</Styled.Message>
            <IconButton
              iconProps={{ icon: 'close' }}
              noBorder
              onClick={() => {
                dispatch(clearNotification());
              }}
              aria-label="Close notification"
            />
          </Styled.Inner>
        </Styled.Notification>
      )}
    </>
  );
}

export default Notification;
