import { useNavigate } from 'react-router-dom';
import blogThunk from '../../app/features/blog.slice';
import readingThunk from '../../app/features/reading.slice';
import { useAppDispatch } from '../../app/hooks';
import useNotification from '../../hooks/useNotification';
import { BlogAttributes } from '../../types/blog.type';
import { ReadingAttributes, ReadingCreation } from '../../types/reading.type';

import { Readings } from '../../types/user.type';
import Blog, { BlogProps } from './Blog';
import { routerUtils } from '../../routes';
import useAsyncHandler from '../../hooks/useAsyncHandler';

export interface BlogContainerProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  blog: BlogProps['blog'];
  authUser: BlogProps['user'];
  oneOfMany?: BlogProps['oneOfMany'];
}

const BlogContainer = ({ children, blog, authUser, oneOfMany, ...props }: BlogContainerProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { notify } = useNotification();
  const { tryCatch } = useAsyncHandler();
  const bookmarked = authUser?.readings?.find((reading) => reading.id === blog?.id);
  const canEdit = !!(authUser?.id === blog.owner?.id);

  const onSave = (data: BlogAttributes) => {
    tryCatch(dispatch(blogThunk.updateOne(data)), `${data.title} saved.`);
  };

  const onDelete = (data: BlogAttributes) => {
    tryCatch(dispatch(blogThunk.deleteOne(data.id)), `${data.title} deleted.`);
  };

  const onLike = (data: BlogAttributes) => {
    // dispatch(blogThunk.likeOne(blog));
    console.log('like', data.title);
  };

  const onBookmark = async (data: BlogAttributes) => {
    if (!authUser) {
      notify({ error: 'You need to be logged in to bookmark a blog.' });
      return;
    }

    const reading: ReadingCreation = {
      blogId: data.id,
      userId: authUser.id,
    };

    if (bookmarked) {
      tryCatch(dispatch(readingThunk.deleteOne(bookmarked.reading.id)), `${data.title} removed from your bookmarks.`);
    } else {
      tryCatch(dispatch(readingThunk.createOne(reading)), `${data.title} added to your bookmarks.`);
    }
  };

  const onRead = async (data: Readings) => {
    if (!authUser) {
      notify({ error: 'You need to be logged in to mark a blog as read.' });
      return;
    }

    const reading = data.reading;

    const update: ReadingAttributes = {
      ...reading,
      read: !reading.read,
      userId: authUser.id,
      blogId: data.id,
    };

    tryCatch(dispatch(readingThunk.updateOne(update)), `${data.title} marked as ${update.read ? 'read' : 'unread'}.`);
  };

  const onMore = (data: BlogAttributes) => {
    navigate(routerUtils.getBlogPath(data.id));
  };

  const blogProps = {
    ...props,
    blog,
    user: authUser,
    canEdit,
    oneOfMany,
    onSave,
    onDelete,
    onLike,
    onBookmark,
    onRead,
    onMore,
  };

  if (!blog) return null;

  return (
    <Blog {...blogProps} bookmarked={!!bookmarked}>
      {children}
    </Blog>
  );
};

export default BlogContainer;
