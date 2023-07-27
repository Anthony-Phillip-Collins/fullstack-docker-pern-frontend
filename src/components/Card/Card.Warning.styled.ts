import { styled } from 'styled-components';

export const StyledWarning = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1;
`;

export const WarningInnner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  ${({ theme }) => ({
    padding: theme.spacing.lg,
  })};
`;

export const WarningHeader = styled.p`
  margin-top: 0;
`;

export const WarningBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  .c-card__warning__button-delete,
  .c-card__warning__button-cancel {
    margin-left: ${({ theme }) => theme.spacing.xl};
    margin-right: ${({ theme }) => theme.spacing.xl};
  }
`;
