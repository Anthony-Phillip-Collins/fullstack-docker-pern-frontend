import { styled } from 'styled-components';

interface Props {
  children: React.ReactNode;
}

const Container = ({ children }: Props) => {
  return (
    <StyledContainer>
      <ContainerInner>{children}</ContainerInner>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 100%;
`;

const ContainerInner = styled.div`
  margin: 0 auto;
  padding: 0 1rem;
`;

export default Container;
