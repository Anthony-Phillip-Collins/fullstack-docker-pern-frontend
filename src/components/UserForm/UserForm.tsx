import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import useInputErrors, { UseInputErrorFields } from '../../hooks/useInputErrors';
import { UserCreateInput } from '../../types/user.type';
import Button from '../Button/Button';
import Form, { FormProps, FormRef } from '../Form/Form';

interface InputFields extends UseInputErrorFields {
  username: string;
  name: string;
  password: string;
}

type Props = FormProps & {
  onFormSubmit: (data: UserCreateInput) => void;
};

const UserForm = forwardRef(
  ({ onFormSubmit, onCancel, onLayout, errors: errorArray, ...props }: Props, ref: React.Ref<FormRef>) => {
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [firstSubmit, setFirstSubmit] = useState(false);
    const inputFields: InputFields = useMemo(
      () => ({
        username,
        name,
        password,
      }),
      [username, name, password],
    );
    const { errors, hasErrors } = useInputErrors<InputFields>({
      errors: errorArray,
      inputFields,
    });

    const reset = () => {
      setUsername('');
      setName('');
      setPassword('');
      setFirstSubmit(false);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setFirstSubmit(true);
      onFormSubmit(inputFields);
    };

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      reset();
      onCancel && onCancel();
    };

    useImperativeHandle(ref, (): FormRef => ({ reset }));

    useEffect(() => {
      if (firstSubmit) {
        onLayout && onLayout();
      }
    }, [errors, firstSubmit, onLayout]);

    return (
      <Form onSubmit={handleSubmit} data-testid="user-form" {...props}>
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
          <Button type="submit" disabled={hasErrors()}>
            Create
          </Button>
        </Form.Footer>
      </Form>
    );
  },
);

UserForm.displayName = 'UserForm';

export default UserForm;
