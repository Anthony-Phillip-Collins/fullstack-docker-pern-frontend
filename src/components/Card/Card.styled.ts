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

type HeaderProps = { owned?: boolean };

const Header = styled.div.withConfig({
  shouldForwardProp: (prop) => !['owned'].includes(prop),
})<HeaderProps>`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  ${({ theme, owned }) => ({
    backgroundColor: owned ? theme.colors.secondary : theme.colors.grey,
    padding: theme.spacing.lg,
  })};

  h2,
  h3,
  h4 {
    margin: 0;
    padding: 0;
    text-overflow: ellipsis;
    overflow: hidden;
    background-color: transparent;
    color: inherit;

    ${({ theme }) => ({
      ...theme.fonts.h2,
      fontFamily: theme.global.fontFamily,
    })};
  }

  > :first-child {
    margin-right: ${({ theme }) => theme.spacing.lg};
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

const IconControls = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  ${({ theme }) => ({
    paddingTop: theme.spacing.lg,
    ['> *']: {
      marginRight: theme.spacing.xl,
    },
  })}
`;

const InputError = styled.span`
  ${({ theme }) => ({
    color: theme.colors.danger,
    marginTop: theme.spacing.md,
    fontSize: theme.fonts.detail.fontSize,
  })};
`;

const CardStyled = {
  Card,
  Inner,
  Header,
  Body,
  Edit,
  IconControls,
  InputError,
};

export default CardStyled;
