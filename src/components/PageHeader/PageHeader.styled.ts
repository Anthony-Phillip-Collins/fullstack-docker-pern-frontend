import { styled } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  ${({ theme }) => ({
    margin: `${theme.spacing.xxl} 0`,
  })};
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => ({
    margin: `${theme.spacing.xl} 0`,
  })};
`;

const ChildContainerNear = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-grow: 1;
  ${({ theme }) => ({
    marginRight: theme.spacing.xl,
  })};
`;

const ChildContainerFar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  margin-right: ${({ theme }) => theme.spacing.xl};
  margin-bottom: 0;
  margin-top: 0;
`;

const PageHeaderStyled = {
  Wrapper,
  TitleContainer,
  ChildContainerNear,
  ChildContainerFar,
  Title,
};

export default PageHeaderStyled;
