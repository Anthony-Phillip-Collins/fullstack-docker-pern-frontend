import useBlogs from '../../hooks/useBlogs';
import BlogList from './BlogList';

const BlogContainer = () => {
  const { data, isLoading, isError } = useBlogs();
  return <BlogList data={data} isLoading={isLoading} isError={isError} />;
};

export default BlogContainer;
