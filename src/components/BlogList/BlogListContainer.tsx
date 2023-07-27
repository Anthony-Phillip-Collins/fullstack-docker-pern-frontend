import blogThunk from '../../app/features/blog.slice';
import { useAppDispatch } from '../../app/hooks';
import useBlogs from '../../hooks/useBlogs';
import { BlogAttributes } from '../../types/blog.type';
import BlogList from './BlogList';
import Container from '../Container/Container';

const BlogContainer = () => {
  const { data } = useBlogs();

  const dispatch = useAppDispatch();

  const onUpdate = (blog: BlogAttributes) => {
    dispatch(blogThunk.updateOne(blog));
  };

  const onDelete = (blog: BlogAttributes) => {
    dispatch(blogThunk.deleteOne(blog.id));
  };

  return (
    <Container>
      <h1>Blogs</h1>
      <BlogList data={data} onUpdate={onUpdate} onDelete={onDelete} />
    </Container>
  );
};

export default BlogContainer;
