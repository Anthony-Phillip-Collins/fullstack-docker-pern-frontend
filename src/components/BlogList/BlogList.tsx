import { BlogAttributes } from '../../types/blog.type';
import Blog, { BlogCallbacks } from '../Blog/Blog';
import { ListItem, StyledList } from './BlogList.styled';

interface Props extends BlogCallbacks {
  data: BlogAttributes[];
}

const BlogList = ({ data, onSave, onDelete }: Props) => {
  return (
    data && (
      <StyledList>
        {data.map((blog) => {
          return (
            <ListItem key={blog.id}>
              <Blog blog={blog} onSave={onSave} onDelete={onDelete} />
            </ListItem>
          );
        })}
      </StyledList>
    )
  );
};

export default BlogList;
