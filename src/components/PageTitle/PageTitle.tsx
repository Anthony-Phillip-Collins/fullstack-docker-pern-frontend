import { StyledPageTitle, StyledPageTitleContainer } from './PageTitle.styled';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  title: string;
}

const PageTitle = ({ children, title, ...props }: Props) => {
  return (
    <StyledPageTitleContainer>
      <StyledPageTitle {...props}>{title}</StyledPageTitle>
      {children}
    </StyledPageTitleContainer>
  );
};

export default PageTitle;
