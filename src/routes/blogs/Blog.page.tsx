import { useParams } from 'react-router-dom';
import BlogContainer from '../../components/Blog/BlogContainer';
import Container from '../../components/Container/Container';
import useBlogById from '../../hooks/useBlogById';
import { BlogAttributes } from '../../types/blog.type';

const BlogPage = () => {
  const params = useParams();
  const id: BlogAttributes['id'] = (params.id && parseInt(params.id)) || -1;
  const { data: blog } = useBlogById(id);

  if (!blog) return null;

  return (
    <Container>
      <BlogContainer blog={blog} />
    </Container>
  );
};

export default BlogPage;
