import { styled } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h1`
  margin-right: ${({ theme }) => theme.spacing.xl};
`;

const PageTitleStyled = {
  Wrapper,
  Title,
};

export default PageTitleStyled;
