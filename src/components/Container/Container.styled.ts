import { styled } from 'styled-components';

const Container = styled.div`
  ${({ theme }) => ({
    padding: `0 ${theme.spacing.xxl}`,
  })}
`;

const Inner = styled.div`
  margin: 0 auto;
  ${({ theme }) => ({
    maxWidth: theme.page.maxWidth,
  })}
`;

const ContainerStyled = {
  Container,
  Inner,
};

export default ContainerStyled;
