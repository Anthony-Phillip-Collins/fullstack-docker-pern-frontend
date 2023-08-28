import PageHeaderStyled from './PageHeader.styled';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  childrenFar?: React.ReactNode;

  title: string;
  propsTitle?: React.HTMLAttributes<HTMLHeadingElement>;
}

const Styled = PageHeaderStyled;

const PageHeader = ({ children, childrenFar, title, propsTitle, ...props }: Props) => {
  return (
    <Styled.Wrapper>
      <Styled.TitleContainer {...props}>
        <Styled.Title {...propsTitle}>{title}</Styled.Title>
        <Styled.ChildContainerNear>{children}</Styled.ChildContainerNear>
      </Styled.TitleContainer>
      <Styled.ChildContainerFar>{childrenFar}</Styled.ChildContainerFar>
    </Styled.Wrapper>
  );
};

export default PageHeader;
