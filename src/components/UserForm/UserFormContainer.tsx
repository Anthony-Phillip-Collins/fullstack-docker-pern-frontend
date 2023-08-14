import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import userThunk from '../../app/features/user.slice';
import { useAppDispatch } from '../../app/hooks';
import useNotification from '../../hooks/useNotification';
import { UserCreateInput } from '../../types/user.type';
import { parseFrontendError } from '../../util/frontendErrorParser';
import UserForm from './UserForm';
import { FormContainerProps, FormRef } from '../../types/form.type';

const UserFormContainer = forwardRef(
  ({ onLayout, onCancel, onSuccess, ...props }: FormContainerProps, ref: React.Ref<FormRef>) => {
    const dispatch = useAppDispatch();
    const { notify } = useNotification();
    const form = useRef<FormRef>(null);
    const [userError, setUserError] = useState<Error | null>(null);

    const onSubmit = async (data: UserCreateInput) => {
      try {
        const payload = await dispatch(userThunk.createOne(data)).unwrap();
        notify(`User ${payload.name} created!`);
        form.current && form.current.reset();
        onSuccess && onSuccess();
        setUserError(null);
      } catch (error) {
        notify({ error });
        setUserError(parseFrontendError(error));
      }
    };

    useImperativeHandle(ref, (): FormRef => ({ reset: form.current?.reset || (() => null) }));

    return (
      <>
        <UserForm
          ref={form}
          onFormSubmit={onSubmit}
          onLayout={onLayout}
          onCancel={onCancel}
          errors={userError?.errors}
          {...props}
        />
      </>
    );
  },
);

UserFormContainer.displayName = 'UserFormContainer';

export default UserFormContainer;
