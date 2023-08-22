import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import useAuth from '../../hooks/useAuth';
import useNotification from '../../hooks/useNotification';
import { UserLogin } from '../../types/user.type';
import { FormContainerProps, FormRef } from '../Form/Form';
import LoginForm from './LoginForm';

const LoginFormContainer = forwardRef(
  ({ onLayout, onSuccess, onCancel, ...props }: FormContainerProps, ref: React.Ref<FormRef>) => {
    const form = useRef<FormRef>(null);
    const { user, logIn } = useAuth();
    const { notify } = useNotification();

    const onLogIn = async (data: UserLogin) => {
      try {
        await logIn(data);
        onSuccess && onSuccess();
        notify('Logged in.');
      } catch (e) {
        notify({ error: e });
      }
    };

    useImperativeHandle(ref, (): FormRef => ({ reset: form.current?.reset || (() => null) }));

    return (
      <>{!user && <LoginForm ref={form} onFormSubmit={onLogIn} onLayout={onLayout} onCancel={onCancel} {...props} />}</>
    );
  },
);

LoginFormContainer.displayName = 'LoginFormContainer';

export default LoginFormContainer;
