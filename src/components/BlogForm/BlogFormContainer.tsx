import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import blogThunk from '../../app/features/blog.slice';
import { useAppDispatch } from '../../app/hooks';
import useNotification from '../../hooks/useNotification';
import { BlogCreation } from '../../types/blog.type';
import { parseFrontendError } from '../../util/frontendErrorParser';
import BlogCreateForm from './BlogForm';
import { FormContainerProps, FormRef } from '../Form/Form';

const BlogCreateFormContainer = forwardRef(
  ({ onLayout, onCancel, onSuccess, ...props }: FormContainerProps, ref: React.Ref<FormRef>) => {
    const dispatch = useAppDispatch();
    const { notify } = useNotification();
    const form = useRef<FormRef>(null);
    const [blogError, setBlogError] = useState<Error | null>(null);

    const onSubmit = async (data: BlogCreation) => {
      try {
        const payload = await dispatch(blogThunk.createOne(data)).unwrap();
        form.current && form.current.reset();
        setBlogError(null);
        notify(`Blog ${payload.title} created!`);
        onSuccess && onSuccess();
      } catch (error) {
        setBlogError(parseFrontendError(error));
        notify({ error });
      }
    };

    useImperativeHandle(ref, (): FormRef => ({ reset: form.current?.reset || (() => null) }));

    return (
      <>
        <BlogCreateForm
          ref={form}
          onFormSubmit={onSubmit}
          onLayout={onLayout}
          onCancel={onCancel}
          errors={blogError?.errors}
          {...props}
        />
      </>
    );
  },
);

BlogCreateFormContainer.displayName = 'BlogCreateFormContainer';

export default BlogCreateFormContainer;
