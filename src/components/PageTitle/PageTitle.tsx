import PageTitleStyled from './PageTitle.styled';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  title: string;
  propsTitle?: React.HTMLAttributes<HTMLHeadingElement>;
  childContainerProps?: React.HTMLAttributes<HTMLDivElement>;
}

const Styled = PageTitleStyled;

const PageTitle = ({ children, title, propsTitle, childContainerProps, ...props }: Props) => {
  return (
    <Styled.Wrapper {...props}>
      <Styled.Title {...propsTitle}>{title}</Styled.Title>
      <Styled.ChildContainer {...childContainerProps}>{children}</Styled.ChildContainer>
    </Styled.Wrapper>
  );
};

export default PageTitle;
