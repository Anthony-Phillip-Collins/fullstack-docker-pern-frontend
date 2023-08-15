import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import Button from '../Button/Button';
import Form from '../Form/Form';
import { FormProps, FormRef } from '../../types/form.type';
import { BlogCreation } from '../../types/blog.type';

interface InputFields {
  title: string;
  author: string;
  url: string;
}

type Props = FormProps & {
  onFormSubmit: (data: BlogCreation) => void;
};

const BlogCreateForm = forwardRef(
  ({ onFormSubmit, onCancel, onLayout, errors: errorArray, ...props }: Props, ref: React.Ref<FormRef>) => {
    const initialErrors: InputFields = useMemo(
      () => ({
        title: '',
        author: '',
        url: '',
      }),
      [],
    );

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');
    const [firstSubmit, setFirstSubmit] = useState(false);
    const [errors, setErrors] = useState<InputFields>(initialErrors);

    const reset = () => {
      setTitle('');
      setAuthor('');
      setUrl('');
      setFirstSubmit(false);
      setErrors(initialErrors);
    };

    const hasErrors = () => {
      return Object.values(errors).some((error) => error !== '');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setFirstSubmit(true);
      onFormSubmit({
        title,
        author,
        url,
        likes: 0,
        year: new Date().getFullYear(),
      });
    };

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      reset();
      onCancel && onCancel();
    };

    useImperativeHandle(ref, (): FormRef => ({ reset }));

    const updateErrorsOnInput = (input: InputFields, state: InputFields) => {
      const update = (key: keyof InputFields) => (input[key] ? '' : state[key] || 'This field is mandatory.');
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
            title,
            author,
            url,
          };

          return updateErrorsOnInput(input, state);
        });
      }
    }, [title, author, url, firstSubmit]);

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
        <Form.Input label="Title" name="title" value={title} setValue={setTitle} error={errors.title} />
        <Form.Input label="Author" name="author" value={author} setValue={setAuthor} error={errors.author} />
        <Form.Input label="Url" name="url" value={url} setValue={setUrl} error={errors.url} />
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

BlogCreateForm.displayName = 'BlogCreateForm';

export default BlogCreateForm;
