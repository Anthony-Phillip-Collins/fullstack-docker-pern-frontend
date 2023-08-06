import { keyframes, styled } from 'styled-components';
import { FontWeight } from '../../styles/types';
import { NotificationInnerProps } from './Notification';

const slideIn = keyframes`
  from { transform: translate(100%); }
  to { transform: translate(0%); }
`;

export const StyledNotification = styled.div`
  position: fixed;
  right: 0;
  bottom: 0;
  overflow: hidden;
`;

export const NotificationInner = styled.div.withConfig({
  shouldForwardProp: (prop) => !['error'].includes(prop),
})<NotificationInnerProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  animation: ${slideIn} 0.2s ease-out forwards;

  ${({ theme, error }) => {
    const borderRadius = theme.global.borderRadius;
    const colors = error
      ? {
          color: theme.colors.textOnDanger,
          backgroundColor: theme.colors.danger,
        }
      : {
          color: theme.colors.textOnSuccess,
          backgroundColor: theme.colors.success,
        };

    return {
      fontSize: theme.fonts.body.fontSize,
      fontWeight: FontWeight.medium,
      borderRadius: `${borderRadius} 0 0 ${borderRadius}`,
      padding: theme.spacing.xl,
      marginBottom: theme.spacing.xl,
      ...colors,
    };
  }};
`;

export const Message = styled.span`
  margin-right: ${({ theme }) => theme.spacing.md};
`;
