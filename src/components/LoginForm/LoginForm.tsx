import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { UserLogin } from '../../types/user.type';
import Button from '../Button/Button';
import Form, { FormProps, FormRef } from '../Form/Form';

interface ErrorProps {
  username: string;
  password: string;
}

type Props = FormProps & {
  onFormSubmit: (data: UserLogin) => void;
};

const LoginForm = forwardRef(({ onFormSubmit, onCancel, onLayout, ...props }: Props, ref: React.Ref<FormRef>) => {
  const initialError: ErrorProps = {
    username: '',
    password: '',
  };
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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

  useImperativeHandle(ref, (): FormRef => ({ reset }));

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
