import { styled } from 'styled-components';
import mixins from '../../styles/mixins';
import { BlogAttributes } from '../../types/blog.type';
import Container from '../Container/Container';
import Blog from './Blog';

interface Props {
  data: BlogAttributes[];
  isLoading: boolean;
  isError?: boolean;
}

const BlogList = ({ data, isLoading, isError = false }: Props) => {
  if (isError) return <div>Something went wrong, check the console...</div>;
  if (isLoading) return <div>Loading...</div>;

  return (
    <Container>
      <h1>Blogs</h1>
      <List>
        {data.map((blog) => (
          <ListItem key={blog.id}>
            <Blog blog={blog} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

const { media } = mixins;

const List = styled.ul`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 0;
  margin: -0.5rem;
  list-style: none;
`;

const ListItem = styled.li`
  display: flex;
  flex-basis: 100%;
  max-width: 100%;

  ${media.md`
    flex-basis: calc(100% / 2);
    max-width: calc(100% / 2);
  `}
  ${media.xl`
    flex-basis: calc(100% / 3);
    max-width: calc(100% / 3);
  `}
`;

export default BlogList;
