import { BlogAttributes } from '../../types/blog.type';
import BlogContainer from '../Blog/BlogContainer';
import { ListItem, StyledList } from './BlogList.styled';

type Props = {
  data: BlogAttributes[];
};

const BlogList = ({ data }: Props) => {
  return (
    data && (
      <StyledList>
        {data.map((blog) => {
          return (
            <ListItem key={blog.id}>
              <BlogContainer blog={blog} />
            </ListItem>
          );
        })}
      </StyledList>
    )
  );
};

export default BlogList;
