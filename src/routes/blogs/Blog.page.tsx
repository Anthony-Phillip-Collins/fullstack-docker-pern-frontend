import { useParams } from 'react-router-dom';
import BlogContainer from '../../components/Blog/BlogContainer';
import Container from '../../components/Container/Container';
import useAuth from '../../hooks/useAuth';
import useBlogById from '../../hooks/useBlogById';
import { BlogAttributes } from '../../types/blog.type';
import NotFoundPage from '../errors/NotFound.page';

const BlogPage = () => {
  const params = useParams();
  const id: BlogAttributes['id'] = (params.id && parseInt(params.id)) || -1;
  const { data: blog, error } = useBlogById(id);
  const { user: authUser } = useAuth();

  if (error) {
    return <NotFoundPage error={error} />;
  }

  return (
    <>
      {blog && (
        <Container>
          <BlogContainer blog={blog} authUser={authUser} />
        </Container>
      )}
    </>
  );
};

export default BlogPage;
