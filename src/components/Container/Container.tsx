import ContainerStyled from './Container.styled';

interface Props extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  propsInner?: React.HTMLAttributes<HTMLElement>;
}

const Styled = ContainerStyled;

const Container = ({ children, propsInner, ...props }: Props) => {
  return (
    <Styled.Container {...props}>
      <Styled.Inner {...propsInner}>{children}</Styled.Inner>
    </Styled.Container>
  );
};

export default Container;
