import { styled } from 'styled-components';

const Warning = styled.div`
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

const Inner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  ${({ theme }) => ({
    padding: theme.spacing.lg,
  })};
`;

const Header = styled.p`
  margin-top: 0;
`;

const Body = styled.div`
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

const CardWarningStyled = {
  Warning,
  Inner,
  Header,
  Body,
};

export default CardWarningStyled;
