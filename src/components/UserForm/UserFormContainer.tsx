import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import userThunk from '../../app/features/user.slice';
import { useAppDispatch } from '../../app/hooks';
import useAsyncHandler from '../../hooks/useAsyncHandler';
import { UserCreateInput } from '../../types/user.type';
import { isErrorResponse } from '../../types/utils/parsers/error.parser';
import UserForm from './UserForm';
import { FormContainerProps, FormRef } from '../Form/Form';

const UserFormContainer = forwardRef(
  ({ onLayout, onCancel, onSuccess, ...props }: FormContainerProps, ref: React.Ref<FormRef>) => {
    const dispatch = useAppDispatch();
    const form = useRef<FormRef>(null);
    const [error, setError] = useState<Error | null>(null);
    const { tryCatch } = useAsyncHandler();

    const onSubmit = async (data: UserCreateInput) => {
      const response = await tryCatch(dispatch(userThunk.createOne(data)), `User ${data.name} created!`);
      if (isErrorResponse(response)) {
        setError(response.error);
      } else {
        reset();
        onSuccess && onSuccess();
      }
    };

    const reset = () => {
      form.current && form.current.reset();
    };

    useImperativeHandle(ref, (): FormRef => ({ reset }));

    return (
      <>
        <UserForm
          ref={form}
          onFormSubmit={onSubmit}
          onLayout={onLayout}
          onCancel={onCancel}
          errors={error?.errors}
          {...props}
        />
      </>
    );
  },
);

UserFormContainer.displayName = 'UserFormContainer';

export default UserFormContainer;
