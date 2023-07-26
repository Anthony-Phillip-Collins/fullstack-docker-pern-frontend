import blogThunk from '../../app/features/blog.slice';
import { useAppDispatch } from '../../app/hooks';
import useBlogs from '../../hooks/useBlogs';
import { BlogAttributes } from '../../types/blog.type';
import Blogs from './Blogs';

const BlogContainer = () => {
  const { data } = useBlogs();

  const dispatch = useAppDispatch();

  const onUpdate = (blog: BlogAttributes) => {
    dispatch(blogThunk.updateOne(blog));
  };

  const onDelete = (blog: BlogAttributes) => {
    dispatch(blogThunk.deleteOne(blog.id));
  };

  return <Blogs data={data} onUpdate={onUpdate} onDelete={onDelete} />;
};

export default BlogContainer;
