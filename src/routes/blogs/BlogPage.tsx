import { useParams } from 'react-router-dom';
import Blog from '../../components/Blog/Blog';
import Container from '../../components/Container/Container';
import useBlogById from '../../hooks/useBlogById';
import { BlogAttributes } from '../../types/blog.type';
import blogThunk from '../../app/features/blog.slice';
import { useAppDispatch } from '../../app/hooks';

const BlogPage = () => {
  const params = useParams();
  const id: BlogAttributes['id'] = (params.id && parseInt(params.id)) || -1;
  const { data } = useBlogById(id);

  const dispatch = useAppDispatch();

  const onSave = (blog: BlogAttributes) => {
    dispatch(blogThunk.updateOne(blog));
  };

  const onDelete = (blog: BlogAttributes) => {
    dispatch(blogThunk.deleteOne(blog.id));
  };

  if (!data) return null;

  return (
    <Container>
      <Blog blog={data} />
      <Blog blog={data} onSave={onSave} onDelete={onDelete} />
    </Container>
  );
};

export default BlogPage;
