import { StyledBlogsHeading, StyledBlogsHeadingContainer } from './BlogsHeading.styled';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title: string;
}

const BlogsHeading = ({ children, title, ...props }: Props) => {
  return (
    <StyledBlogsHeadingContainer>
      <StyledBlogsHeading {...props}>{title}</StyledBlogsHeading>
      {children}
    </StyledBlogsHeadingContainer>
  );
};

export default BlogsHeading;
