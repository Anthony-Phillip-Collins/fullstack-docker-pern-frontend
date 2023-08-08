import ContainerStyled from './Container.styled';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Styled = ContainerStyled;

const Container = ({ children, ...props }: Props) => {
  return (
    <Styled.Container {...props}>
      <Styled.Inner>{children}</Styled.Inner>
    </Styled.Container>
  );
};

export default Container;
