import BlogList from '../../components/BlogList/BlogList';
import Container from '../../components/Container/Container';
import useBlogs from '../../hooks/useBlogs';

const BlogsPage = () => {
  const { data } = useBlogs();

  if (!data) return null;

  return (
    <Container>
      <h1>Blogs</h1>
      <BlogList data={data} />
    </Container>
  );
};

export default BlogsPage;
