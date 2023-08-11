import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { UserCreateInput } from '../../types/user.type';
import Button from '../Button/Button';
import Form from '../Form/Form';

export interface UserFormRef {
  reset: () => void;
}

interface Common extends React.HTMLAttributes<HTMLFormElement> {
  children?: React.ReactNode;
}

interface ErrorProps {
  username: string;
  name: string;
  password: string;
}

export interface UserFormShared {
  onLayout?: () => void;
  onCancel?: () => void;
}

type Props = Common &
  UserFormShared & {
    onFormSubmit: (data: UserCreateInput) => void;
  };

const UserForm = forwardRef(({ onFormSubmit, onCancel, onLayout, ...props }: Props, ref: React.Ref<UserFormRef>) => {
  const initialError: ErrorProps = {
    username: '',
    name: '',
    password: '',
  };
  const [username, setUsername] = useState('Ant One');
  const [name, setName] = useState('Ant One');
  const [password, setPassword] = useState('letmein');
  const [firstSubmit, setFirstSubmit] = useState(false);
  const [errors, setErrors] = useState<ErrorProps>(initialError);
  const defaultError = 'This field is mandatory.';

  const reset = () => {
    setUsername('');
    setName('');
    setPassword('');
    setFirstSubmit(false);
    setErrors(initialError);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: UserCreateInput = {
      username,
      name,
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

  useImperativeHandle(ref, (): UserFormRef => ({ reset }));

  useEffect(() => {
    if (firstSubmit) {
      setErrors((state) => {
        const updated: ErrorProps = {
          username: !username ? defaultError : '',
          name: !name ? defaultError : '',
          password: !password ? defaultError : '',
        };
        const changed =
          (Object.keys(state) as Array<keyof ErrorProps>).filter((key) => state[key] !== updated[key]).length > 0;
        return changed ? updated : state;
      });
    }
  }, [username, name, password, firstSubmit]);

  useEffect(() => {
    if (firstSubmit) {
      onLayout && onLayout();
    }
  }, [errors, firstSubmit, onLayout]);

  return (
    <Form onSubmit={handleSubmit} {...props}>
      <Form.Input label="Username" name="username" value={username} setValue={setUsername} error={errors.username} />
      <Form.Input label="Name" name="name" value={name} setValue={setName} error={errors.name} />
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
        <Button type="submit">Create</Button>
      </Form.Footer>
    </Form>
  );
});

UserForm.displayName = 'UserForm';

export default UserForm;
