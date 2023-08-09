import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import blogThunk from '../../app/features/blog.slice';
import { useAppDispatch } from '../../app/hooks';
import useNotification from '../../hooks/useNotification';
import { BlogCreation } from '../../types/blog.type';
import BlogForm, { BlogFormRef, BlogFormShared } from './BlogForm';

interface BlogFormContainerProps extends BlogFormShared {
  onSuccess?: () => void;
}

const BlogFormContainer = forwardRef(
  ({ onLayout, onCancel, onSuccess }: BlogFormContainerProps, ref: React.Ref<BlogFormRef>) => {
    const dispatch = useAppDispatch();
    const { notify } = useNotification();
    const form = useRef<BlogFormRef>(null);

    const onSubmit = async (data: BlogCreation) => {
      try {
        const payload = await dispatch(blogThunk.createOne(data)).unwrap();
        notify(`Blog ${payload.title} created!`);
        form.current && form.current.reset();
        onSuccess && onSuccess();
      } catch (error) {
        notify({ error });
      }
    };

    useImperativeHandle(ref, (): BlogFormRef => ({ reset: form.current?.reset || (() => null) }));

    return (
      <>
        <BlogForm ref={form} onFormSubmit={onSubmit} onLayout={onLayout} onCancel={onCancel} />
      </>
    );
  },
);

BlogFormContainer.displayName = 'BlogFormContainer';

export default BlogFormContainer;
