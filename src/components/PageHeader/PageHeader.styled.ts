import { styled } from 'styled-components';
import mixins from '../../styles/mixins';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  ${({ theme }) => ({
    margin: `${theme.spacing.xxl} 0`,

    ...mixins.media.md({
      flexDirection: 'row',
      alignItems: 'center',
    }),
  })};
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
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
  ${({ theme }) => ({
    marginTop: theme.spacing.xxl,

    ...mixins.media.md({
      marginTop: 0,
    }),
  })};
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
