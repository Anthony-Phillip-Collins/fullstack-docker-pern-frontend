import { styled } from 'styled-components';
import { BlogAttributes } from '../../types/blog.type';
import Button from '../Button/Button';
import IconButton from '../IconButton/IconButton';
import TextLink from '../TextLink/TextLink';

interface Props {
  blog: BlogAttributes;
}

const Blog = ({ blog }: Props) => {
  return (
    <StyledBlog>
      <BlogInner>
        <Header>
          <HeaderHeading>{blog.title}</HeaderHeading>

          <IconButton iconProps={{ icon: 'edit', size: 'xl' }} onClick={() => console.log('click')} />
          <IconButton iconProps={{ icon: 'cancel', size: 'xl' }} onClick={() => console.log('click')} />
        </Header>
        <Body>
          <BodyHeading>by {blog.author}</BodyHeading>
          <Likes>has {blog.likes} likes</Likes>
          <TextLink target="_blank" href="/api" truncate>
            {blog.url}
          </TextLink>
          <Edit>
            <Button variant="primary">Save</Button>
            <Button variant="danger">Delete</Button>
          </Edit>
        </Body>
      </BlogInner>
    </StyledBlog>
  );
};

const StyledBlog = styled.article`
  display: flex;
  flex-basis: 100%;
  overflow: hidden;
  margin: 0.5rem;
  ${({ theme }) => ({
    /* color: theme.primary.color, */
    borderRadius: theme.global.borderRadius,
  })};
`;

const BlogInner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0;
`;

const Header = styled.header`
  ${({ theme }) => ({
    backgroundColor: theme.colors.grey,
    padding: theme.spacing.lg,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  })};
`;

const HeaderHeading = styled.h2`
  margin: 0;
  padding: 0;
`;

const Body = styled.div`
  flex: 1;
  ${({ theme }) => ({
    backgroundColor: theme.colors.greyVariant,
    padding: theme.spacing.lg,
  })};
`;

const BodyHeading = styled.h3`
  margin: 0;
  padding: 0;
`;

const Likes = styled.p`
  margin: 0;
  padding: 0;
`;

const Edit = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default Blog;
