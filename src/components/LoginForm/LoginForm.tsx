import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import Button from '../Button/Button';
import Form from '../Form/Form';
import { UserLogin } from '../../types/user.type';

export interface LoginFormRef {
  reset: () => void;
}

interface Common extends React.HTMLAttributes<HTMLFormElement> {
  children?: React.ReactNode;
}

interface ErrorProps {
  username: string;
  password: string;
}

export interface LoginFormShared {
  onLayout?: () => void;
  onCancel?: () => void;
}

type Props = Common &
  LoginFormShared & {
    onFormSubmit: (data: UserLogin) => void;
  };

const LoginForm = forwardRef(({ onFormSubmit, onCancel, onLayout, ...props }: Props, ref: React.Ref<LoginFormRef>) => {
  const initialError: ErrorProps = {
    username: '',
    password: '',
  };
  const [username, setUsername] = useState('admin@foobar.com');
  const [password, setPassword] = useState('letmein');
  const [firstSubmit, setFirstSubmit] = useState(false);
  const [errors, setErrors] = useState<ErrorProps>(initialError);
  const defaultError = 'This field is mandatory.';

  const reset = () => {
    setUsername('');
    setPassword('');
    setFirstSubmit(false);
    setErrors(initialError);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: UserLogin = {
      username,
      password,
    };

    setFirstSubmit(true);

    onFormSubmit(data);
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    reset();
    onCancel && onCancel();
  };

  useImperativeHandle(ref, (): LoginFormRef => ({ reset }));

  useEffect(() => {
    if (firstSubmit) {
      setErrors((state) => {
        const updated: ErrorProps = {
          username: !username ? defaultError : '',
          password: !password ? defaultError : '',
        };
        const changed =
          (Object.keys(state) as Array<keyof ErrorProps>).filter((key) => state[key] !== updated[key]).length > 0;
        return changed ? updated : state;
      });
    }
  }, [username, password, firstSubmit]);

  useEffect(() => {
    if (firstSubmit) {
      onLayout && onLayout();
    }
  }, [errors, firstSubmit, onLayout]);

  return (
    <Form onSubmit={handleSubmit} {...props}>
      <Form.Input label="Username" name="username" value={username} setValue={setUsername} error={errors.username} />
      <Form.Input
        label="Password"
        name="password"
        value={password}
        setValue={setPassword}
        error={errors.password}
        type="password"
      />
      <Form.Footer>
        {onCancel && (
          <Button type="button" variant="danger" onClick={handleCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">Login</Button>
      </Form.Footer>
    </Form>
  );
});

LoginForm.displayName = 'LoginForm';

export default LoginForm;
