import { BlogAttributes } from '../../types/blog.type';
import BlogContainer from '../Blog/BlogContainer';
import InternalLink from '../Link/InternalLink';
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
              <BlogContainer blog={blog}>
                <div>
                  <InternalLink to={`/blogs/${blog.id}`}>Read more</InternalLink>
                </div>
              </BlogContainer>
            </ListItem>
          );
        })}
      </StyledList>
    )
  );
};

export default BlogList;
