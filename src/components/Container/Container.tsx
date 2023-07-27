import { ContainerInner, StyledContainer } from './Container.styled';

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

export default Container;
