import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { UserCreateInput } from '../../types/user.type';
import Button from '../Button/Button';
import Form from '../Form/Form';
import { useAppDispatch } from '../../app/hooks';
import { clearUserError } from '../../app/features/user.slice';
import { FormProps, FormRef } from '../../types/form.type';

interface InputFields {
  username: string;
  name: string;
  password: string;
}

type Props = FormProps & {
  onFormSubmit: (data: UserCreateInput) => void;
};

const UserForm = forwardRef(
  ({ onFormSubmit, onCancel, onLayout, errors: errorArray, ...props }: Props, ref: React.Ref<FormRef>) => {
    const initialErrors: InputFields = useMemo(
      () => ({
        username: '',
        name: '',
        password: '',
      }),
      [],
    );
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [firstSubmit, setFirstSubmit] = useState(false);
    const [errors, setErrors] = useState<InputFields>(initialErrors);
    const dispatch = useAppDispatch();
    const defaultError = 'This field is mandatory.';

    const reset = () => {
      setUsername('');
      setName('');
      setPassword('');
      setFirstSubmit(false);
      setErrors(initialErrors);
      dispatch(clearUserError());
    };

    const hasErrors = () => {
      return Object.values(errors).some((error) => error !== '');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setFirstSubmit(true);
      onFormSubmit({
        username,
        name,
        password,
      });
    };

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      reset();
      onCancel && onCancel();
    };

    useImperativeHandle(ref, (): FormRef => ({ reset }));

    const updateErrorsOnInput = (input: InputFields, state: InputFields) => {
      const update = (key: keyof InputFields) => (input[key] ? '' : state[key] || defaultError);
      const keys = Object.keys(state) as Array<keyof InputFields>;
      const updated = keys.reduce((obj, key) => {
        obj[key] = update(key);
        return obj;
      }, {} as InputFields);
      const changed = keys.filter((key) => state[key] !== updated[key]).length > 0;
      return changed ? updated : state;
    };

    /* avoid changing state on every keystroke by returning state if error values haven't changed */
    useEffect(() => {
      if (firstSubmit) {
        setErrors((state) => {
          const input: InputFields = {
            username,
            name,
            password,
          };

          return updateErrorsOnInput(input, state);
        });
      }
    }, [username, name, password, firstSubmit, errorArray]);

    useEffect(() => {
      if (errorArray) {
        const updated = { ...initialErrors };
        const keys = Object.keys(updated) as Array<keyof InputFields>;
        errorArray.forEach((error) => {
          keys.forEach((key) => {
            if (error.path === key) {
              updated[key] = error.message;
            }
          });
        });
        setErrors(updated);
      }
    }, [errorArray, initialErrors]);

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
