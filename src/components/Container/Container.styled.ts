import { styled } from 'styled-components';

const Container = styled.div`
  /* width: 100%; */
  border: 2px solid red;
  ${({ theme }) => ({
    padding: `0 ${theme.spacing.xl}`,
  })}
`;

const Inner = styled.div`
  margin: 0 auto;
  border: 2px solid lime;
  ${({ theme }) => ({
    maxWidth: theme.page.maxWidth,
  })}
`;

const ContainerStyled = {
  Container,
  Inner,
};

export default ContainerStyled;
