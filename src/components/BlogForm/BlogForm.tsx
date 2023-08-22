import { forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import useInputErrors, { UseInputErrorFields } from '../../hooks/useInputErrors';
import { BlogCreation } from '../../types/blog.type';
import Button from '../Button/Button';
import Form, { FormProps, FormRef } from '../Form/Form';

interface InputFields {
  title: string;
  author: string;
  url: string;
}

type InputErrorFields = InputFields & UseInputErrorFields;

type Props = FormProps & {
  onFormSubmit: (data: BlogCreation) => void;
};

const BlogCreateForm = forwardRef(
  ({ onFormSubmit, onCancel, onLayout, errors: errorArray, ...props }: Props, ref: React.Ref<FormRef>) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');
    const [firstSubmit, setFirstSubmit] = useState(false);

    const inputFields: InputErrorFields = useMemo(
      () => ({
        title,
        author,
        url,
      }),
      [title, author, url],
    );

    const { errors, hasErrors } = useInputErrors<InputErrorFields>({
      errors: errorArray,
      inputFields,
    });

    const reset = () => {
      setTitle('');
      setAuthor('');
      setUrl('');
      setFirstSubmit(false);
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
