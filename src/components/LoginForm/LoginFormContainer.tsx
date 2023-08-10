import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import useAuth from '../../hooks/useAuth';
import useNotification from '../../hooks/useNotification';
import { UserLogin } from '../../types/user.type';
import LoginForm, { LoginFormRef, LoginFormShared } from './LoginForm';
interface Common extends React.HTMLAttributes<HTMLFormElement> {
  children?: React.ReactNode;
}

type Props = LoginFormShared &
  Common & {
    onSuccess?: () => void;
  };

const LoginFormContainer = forwardRef(
  ({ onLayout, onSuccess, onCancel, ...props }: Props, ref: React.Ref<LoginFormRef>) => {
    const form = useRef<LoginFormRef>(null);
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

    useImperativeHandle(ref, (): LoginFormRef => ({ reset: form.current?.reset || (() => null) }));

    return (
      <>{!user && <LoginForm ref={form} onFormSubmit={onLogIn} onLayout={onLayout} onCancel={onCancel} {...props} />}</>
    );
  },
);

LoginFormContainer.displayName = 'LoginFormContainer';

export default LoginFormContainer;
