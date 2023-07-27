import blogThunk from '../app/features/blog.slice';
import { useAppDispatch } from '../app/hooks';
import BlogList from '../components/BlogList/BlogList';
import Container from '../components/Container/Container';
import useBlogs from '../hooks/useBlogs';
import { BlogAttributes } from '../types/blog.type';

const BlogsPage = () => {
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

export default BlogsPage;
