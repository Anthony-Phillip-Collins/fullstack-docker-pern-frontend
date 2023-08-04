import { styled } from 'styled-components';
import { FontWeight } from '../../styles/types';
import { NotificationInnerProps } from './Notification';

export const StyledNotification = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  overflow: hidden;
  display: flex;
  justify-content: flex-end;
`;

export const NotificationInner = styled.div.withConfig({
  shouldForwardProp: (prop) => !['error', 'show', 'offsetX'].includes(prop),
})<NotificationInnerProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${({ theme, error, offsetX }) => {
    const errorStyles = error
      ? {
          color: theme.colors.textOnDanger,
          backgroundColor: theme.colors.danger,
        }
      : {
          color: theme.colors.textOnSuccess,
          backgroundColor: theme.colors.success,
        };
    const borderRadius = theme.global.borderRadius;
    return {
      transform: `translateX(${offsetX}px)`,
      fontSize: theme.fonts.body.fontSize,
      fontWeight: FontWeight.medium,
      borderRadius: `${borderRadius} 0 0 ${borderRadius}`,
      padding: theme.spacing.xl,
      marginBottom: theme.spacing.xl,
      ...errorStyles,
    };
  }}
`;
export const Message = styled.span`
  margin-right: ${({ theme }) => theme.spacing.md};
`;
