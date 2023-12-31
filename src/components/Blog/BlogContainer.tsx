import { useNavigate } from 'react-router-dom';
import blogThunk from '../../app/features/blog.slice';
import readingThunk from '../../app/features/reading.slice';
import { useAppDispatch } from '../../app/hooks';
import useNotification from '../../hooks/useNotification';
import { BlogAttributes } from '../../types/blog.type';
import { ReadingAttributes, ReadingCreation } from '../../types/reading.type';

import { useRef, useState } from 'react';
import likeThunk from '../../app/features/like.slice';
import useAsyncHandler from '../../hooks/useAsyncHandler';
import { routerUtils } from '../../routes';
import { LikeCreation } from '../../types/like.type';
import { Readings } from '../../types/user.type';
import { isErrorResponse } from '../../types/utils/parsers/error.parser';
import Blog, { BlogProps, BlogRef } from './Blog';

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
  const liked = authUser?.likings?.find((liking) => liking.id === blog?.id);
  const canEdit = !!(authUser?.id === blog.owner?.id);
  const [error, setError] = useState<Error | null>();
  const blogRef = useRef<BlogRef>(null);

  const onSave = async (data: BlogAttributes) => {
    const response = await tryCatch(dispatch(blogThunk.updateOne(data)), `${data.title} saved.`);
    if (isErrorResponse(response)) {
      setError(response.error);
    } else {
      reset();
      blogRef?.current?.saved();
    }
  };

  const reset = () => {
    setError(null);
  };

  const onDelete = (data: BlogAttributes) => {
    tryCatch(dispatch(blogThunk.deleteOne(data.id)), `${data.title} deleted.`);
  };

  const onCancel = () => {
    reset();
  };

  const onLike = (blog: BlogAttributes) => {
    if (!authUser) {
      notify({ error: 'You need to be logged in to like a blog.' });
      return;
    }

    const like: LikeCreation = {
      blogId: blog.id,
      userId: authUser.id,
    };

    if (liked) {
      tryCatch(dispatch(likeThunk.deleteOne(liked.like.id)), `Removed like from ${blog.title}.`);
    } else {
      tryCatch(dispatch(likeThunk.createOne(like)), `Added like to ${blog.title}.`);
    }
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

  const blogProps: BlogProps = {
    ...props,
    blog,
    user: authUser,
    canEdit,
    oneOfMany,
    onSave,
    onDelete,
    onMore,
    onCancel,
    onLike,
    onBookmark,
    onRead,
  };

  if (!blog) return null;

  return (
    <Blog
      {...blogProps}
      bookmarked={!!bookmarked}
      liked={!!liked}
      errors={error?.errors}
      ref={blogRef}
      data-testid="blog"
    >
      {children}
    </Blog>
  );
};

export default BlogContainer;
