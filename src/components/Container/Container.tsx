import { ContainerInner, StyledContainer } from './Container.styled';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Container = ({ children, ...props }: Props) => {
  return (
    <StyledContainer {...props}>
      <ContainerInner>{children}</ContainerInner>
    </StyledContainer>
  );
};

export default Container;
