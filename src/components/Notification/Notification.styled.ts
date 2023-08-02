import { styled } from 'styled-components';
import { NotificationType } from '../../types/notification.type';
import { FontWeight } from '../../styles/types';

export const StyledNotification = styled.div.withConfig({
  shouldForwardProp: (prop) => !['error'].includes(prop),
})<Pick<NotificationType, 'error'>>`
  position: absolute;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ theme, error }) => {
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
