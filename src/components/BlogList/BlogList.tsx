import useAuth from '../../hooks/useAuth';
import BlogContainer, { BlogContainerProps } from '../Blog/BlogContainer';
import Grid from '../Grid/Grid';

type Props = {
  data: BlogContainerProps['blog'][];
};

const BlogList = ({ data }: Props) => {
  const { user } = useAuth();
  return (
    data && (
      <Grid>
        {data.map((blog) => {
          return (
            <Grid.Item key={blog.id}>
              <BlogContainer blog={blog} authUser={user} oneOfMany />
            </Grid.Item>
          );
        })}
      </Grid>
    )
  );
};

export default BlogList;
