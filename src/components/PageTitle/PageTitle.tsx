import PageTitleStyled from './PageTitle.styled';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  title: string;
  propsTitle?: React.HTMLAttributes<HTMLHeadingElement>;
}

const Styled = PageTitleStyled;

const PageTitle = ({ children, title, propsTitle, ...props }: Props) => {
  return (
    <Styled.Wrapper {...props}>
      <Styled.Title {...propsTitle}>{title}</Styled.Title>
      {children}
    </Styled.Wrapper>
  );
};

export default PageTitle;
