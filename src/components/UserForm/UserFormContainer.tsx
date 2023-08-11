import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import userThunk from '../../app/features/user.slice';
import { useAppDispatch } from '../../app/hooks';
import useNotification from '../../hooks/useNotification';
import UserForm, { UserFormRef, UserFormShared } from './UserForm';
import { UserCreateInput } from '../../types/user.type';

interface Common extends React.HTMLAttributes<HTMLFormElement> {
  children?: React.ReactNode;
}

type UserFormContainerProps = UserFormShared &
  Common & {
    onSuccess?: () => void;
  };

const UserFormContainer = forwardRef(
  ({ onLayout, onCancel, onSuccess, ...props }: UserFormContainerProps, ref: React.Ref<UserFormRef>) => {
    const dispatch = useAppDispatch();
    const { notify } = useNotification();
    const form = useRef<UserFormRef>(null);

    const onSubmit = async (data: UserCreateInput) => {
      try {
        const payload = await dispatch(userThunk.createOne(data)).unwrap();
        notify(`User ${payload.name} created!`);
        form.current && form.current.reset();
        onSuccess && onSuccess();
      } catch (error) {
        notify({ error });
      }
    };

    useImperativeHandle(ref, (): UserFormRef => ({ reset: form.current?.reset || (() => null) }));

    return (
      <>
        <UserForm ref={form} onFormSubmit={onSubmit} onLayout={onLayout} onCancel={onCancel} {...props} />
      </>
    );
  },
);

UserFormContainer.displayName = 'UserFormContainer';

export default UserFormContainer;
