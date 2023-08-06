import { BlogAttributes } from '../../types/blog.type';
import BlogContainer from '../Blog/BlogContainer';
import Grid from '../Grid/Grid';

type Props = {
  data: BlogAttributes[];
};

const BlogList = ({ data }: Props) => {
  return (
    data && (
      <Grid>
        {data.map((blog) => {
          return (
            <Grid.Item key={blog.id}>
              <BlogContainer blog={blog} />
            </Grid.Item>
          );
        })}
      </Grid>
    )
  );
};

export default BlogList;
