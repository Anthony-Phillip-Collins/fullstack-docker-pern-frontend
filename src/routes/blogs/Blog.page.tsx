import { useParams } from 'react-router-dom';
import BlogContainer from '../../components/Blog/BlogContainer';
import Container from '../../components/Container/Container';
import useAuth from '../../hooks/useAuth';
import useBlogById from '../../hooks/useBlogById';
import { BlogAttributes } from '../../types/blog.type';
import NotFoundPage from '../errors/NotFound.page';
import theme from '../../styles/theme';
import { StatusCodes } from '../../types/errors.type';

const BlogPage = () => {
  const params = useParams();
  const id: BlogAttributes['id'] = (params.id && parseInt(params.id)) || -1;
  const { data: blog, error, loading } = useBlogById(id);
  const { user: authUser } = useAuth();

  if (error?.status === StatusCodes.NOT_FOUND) {
    return <NotFoundPage error={error} />;
  }

  if (loading) {
    return null;
  }

  return (
    <>
      {blog && (
        <Container style={{ marginTop: theme.spacing.xxl }}>
          <BlogContainer blog={blog} authUser={authUser} />
        </Container>
      )}
    </>
  );
};

export default BlogPage;
