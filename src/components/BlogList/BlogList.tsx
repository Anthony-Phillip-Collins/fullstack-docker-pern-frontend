import { BlogAttributes } from '../../types/blog.type';
import Blog, { BlogCallbacks } from '../Blog/Blog';
import { ListItem, StyledList } from './BlogList.styled';

interface Props extends BlogCallbacks {
  data: BlogAttributes[];
}

const BlogList = ({ data, onUpdate, onDelete }: Props) => {
  return (
    data && (
      <StyledList>
        {data.map((blog) => (
          <ListItem key={blog.id}>
            <Blog blog={blog} onUpdate={onUpdate} onDelete={onDelete} />
          </ListItem>
        ))}
      </StyledList>
    )
  );
};

export default BlogList;
