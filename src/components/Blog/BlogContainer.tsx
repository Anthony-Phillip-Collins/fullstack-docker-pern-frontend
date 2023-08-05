import { useNavigate } from 'react-router-dom';
import blogThunk from '../../app/features/blog.slice';
import readingThunk from '../../app/features/reading.slice';
import { useAppDispatch } from '../../app/hooks';
import useAuth from '../../hooks/useAuth';
import useNotification from '../../hooks/useNotification';
import { BlogAttributes } from '../../types/blog.type';
import { ReadingCreation } from '../../types/reading.type';

import Blog, { BlogProps } from './Blog';

const BlogContainer = ({ children, blog, ...props }: BlogProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const { notify, notifyAsync } = useNotification();
  const bookmarked = user?.readings?.find((reading) => reading.id === blog?.id);
  const canEdit = !!(user?.id === blog.owner?.id);

  const onSave = (data: BlogAttributes) => {
    notifyAsync(dispatch(blogThunk.updateOne(data)), `${data.title} saved.`);
  };

  const onDelete = (data: BlogAttributes) => {
    notifyAsync(dispatch(blogThunk.deleteOne(data.id)), `${data.title} deleted.`);
  };

  const onLike = (data: BlogAttributes) => {
    // dispatch(blogThunk.likeOne(blog));
    console.log('like', data.title);
  };

  const onBookmark = async (data: BlogAttributes) => {
    if (!user) {
      notify({ error: 'You need to be logged in to bookmark a blog.' });
      return;
    }

    const reading: ReadingCreation = {
      blogId: data.id,
      userId: user.id,
    };

    if (bookmarked) {
      await notifyAsync(
        dispatch(readingThunk.deleteOne(bookmarked.reading.id)),
        `${data.title} removed from your bookmarks.`,
      );
    } else {
      await notifyAsync(dispatch(readingThunk.createOne(reading)), `${data.title} added to your bookmarks.`);
    }
  };

  const onMore = (data: BlogAttributes) => {
    navigate(`/blogs/${data.id}`);
  };

  const blogProps = {
    ...props,
    blog,
    onSave,
    onDelete,
    onLike,
    onBookmark,
    onMore,
  };

  if (!blog) return null;

  return (
    <Blog {...blogProps} canEdit={canEdit} bookmarked={!!bookmarked}>
      {children}
    </Blog>
  );
};

export default BlogContainer;
