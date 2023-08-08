import { styled } from 'styled-components';
import { CardInnerProps } from './Card';

const Card = styled.article`
  position: relative;
  display: flex;
  flex-basis: 100%;
  overflow: hidden;
  ${({ theme }) => ({
    borderRadius: theme.global.borderRadius,
  })};
`;

const Inner = styled.div.withConfig({
  shouldForwardProp: (prop) => !['warning'].includes(prop),
})<CardInnerProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0;
  ${({ warning }) => ({
    filter: warning ? 'blur(0.25rem)' : 'none',
  })};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  ${({ theme }) => ({
    backgroundColor: theme.colors.grey,
    padding: theme.spacing.lg,
  })};

  > *:first-child {
    margin: 0;
    padding: 0;
    text-overflow: ellipsis;
    overflow: hidden;
    background-color: transparent;
    color: inherit;

    ${({ theme }) => ({
      ...theme.fonts.h2,
      fontFamily: theme.global.fontFamily,
      marginRight: theme.spacing.lg,
    })};
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  ${({ theme }) => ({
    backgroundColor: theme.colors.greyVariant,
    padding: theme.spacing.lg,
  })};
`;

const Edit = styled.footer`
  display: flex;
  justify-content: space-between;
  ${({ theme }) => ({
    marginTop: theme.spacing.xl,
  })};
`;

const CardStyled = {
  Card,
  Inner,
  Header,
  Body,
  Edit,
};

export default CardStyled;
