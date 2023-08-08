import PageTitleStyled from './PageTitle.styled';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  title: string;
}

const Styled = PageTitleStyled;

const PageTitle = ({ children, title, ...props }: Props) => {
  return (
    <Styled.Wrapper>
      <Styled.Title {...props}>{title}</Styled.Title>
      <Styled.Children>{children}</Styled.Children>
    </Styled.Wrapper>
  );
};

export default PageTitle;
