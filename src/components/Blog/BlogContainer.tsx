import blogThunk from '../../app/features/blog.slice';
import readingThunk from '../../app/features/reading.slice';
import { useAppDispatch } from '../../app/hooks';
import useAuth from '../../hooks/useAuth';
import { BlogAttributes } from '../../types/blog.type';
import { ReadingCreation } from '../../types/reading.type';

import Blog, { BlogProps } from './Blog';

const BlogContainer = ({ children, blog, ...props }: BlogProps) => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const bookmarked = user?.readings?.find((reading) => reading.id === blog?.id);
  const canEdit = !!(user?.id === blog.owner?.id);

  const onSave = (data: BlogAttributes) => {
    dispatch(blogThunk.updateOne(data));
  };

  const onDelete = (data: BlogAttributes) => {
    dispatch(blogThunk.deleteOne(data.id));
  };

  const onLike = (data: BlogAttributes) => {
    // dispatch(blogThunk.likeOne(blog));
    console.log('like', data.title);
  };

  const onBookmark = (data: BlogAttributes) => {
    if (!user) {
      console.log('You need to be logged in to bookmark a blog.');
      return;
    }
    const reading: ReadingCreation = {
      blogId: data.id,
      userId: user.id,
    };

    if (bookmarked) {
      dispatch(readingThunk.deleteOne(bookmarked.reading.id));
    } else {
      dispatch(readingThunk.createOne(reading));
    }
  };

  const blogProps = {
    ...props,
    blog,
    onSave,
    onDelete,
    onLike,
    onBookmark,
  };

  if (!blog) return null;

  return (
    <Blog {...blogProps} canEdit={canEdit} bookmarked={!!bookmarked}>
      {children}
      {blog.readers && (
        <div>
          <h3>Readers:</h3>
          <ul>
            {blog.readers.map((reader) => {
              return <li key={reader.name}>{reader.name}</li>;
            })}
          </ul>
        </div>
      )}
    </Blog>
  );
};

export default BlogContainer;
