import { useLayoutEffect, useRef, useState } from 'react';
import { clearNotification } from '../../app/features/notification.slice';
import { useAppDispatch } from '../../app/hooks';
import { NotificationType } from '../../types/notification.type';
import { parseError } from '../../types/utils/parsers/error.parser';
import IconButton from '../IconButton/IconButton';
import { Message, NotificationInner, StyledNotification } from './Notification.styled';

export interface NotificationInnerProps {
  error: boolean;
  show?: boolean;
  offsetX?: number;
}

type Props = NotificationType;

function Notification({ message, error }: Props) {
  const dispatch = useAppDispatch();
  const err = parseError(error);
  const msg = err?.message || message;
  const innerRef = useRef<HTMLDivElement>(null);
  const [offsetX, setOffsetX] = useState<number>(0);

  // need to fix this

  useLayoutEffect(() => {
    if (innerRef.current) {
      // setOffsetX(innerRef.current.offsetWidth * 0.5);
      setOffsetX(0);
      console.log(offsetX);
    }
  }, [offsetX]);

  return (
    <>
      {msg && (
        <StyledNotification>
          <NotificationInner error={!!error} show={!!msg} ref={innerRef} offsetX={offsetX}>
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
