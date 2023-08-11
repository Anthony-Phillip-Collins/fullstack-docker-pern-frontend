import { styled } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChildContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
`;

const Title = styled.h1`
  margin-right: ${({ theme }) => theme.spacing.xl};
`;

const PageTitleStyled = {
  Wrapper,
  ChildContainer,
  Title,
};

export default PageTitleStyled;
