import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { BlogCreation } from '../../types/blog.type';
import Button from '../Button/Button';
import Form from '../Form/Form';

export interface BlogFormRef {
  reset: () => void;
}

interface Common extends React.HTMLAttributes<HTMLFormElement> {
  children?: React.ReactNode;
}

interface ErrorProps {
  title: string;
  author: string;
  url: string;
}

export interface BlogFormShared {
  onLayout?: () => void;
  onCancel?: () => void;
}

type Props = Common &
  BlogFormShared & {
    onFormSubmit: (data: BlogCreation) => void;
  };

const BlogForm = forwardRef(({ onFormSubmit, onCancel, onLayout, ...props }: Props, ref: React.Ref<BlogFormRef>) => {
  const initialError: ErrorProps = {
    title: '',
    author: '',
    url: '',
  };
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [firstSubmit, setFirstSubmit] = useState(false);
  const [errors, setErrors] = useState<ErrorProps>(initialError);
  const defaultError = 'This field is mandatory.';

  const reset = () => {
    setTitle('');
    setAuthor('');
    setUrl('');
    setFirstSubmit(false);
    setErrors(initialError);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data: BlogCreation = {
      title,
      author,
      url,
      likes: 0,
      year: new Date().getFullYear(),
    };

    setFirstSubmit(true);

    onFormSubmit(data);
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    reset();
    onCancel && onCancel();
  };

  useImperativeHandle(ref, (): BlogFormRef => ({ reset }));

  useEffect(() => {
    if (firstSubmit) {
      setErrors((state) => {
        const updated: ErrorProps = {
          title: !title ? defaultError : '',
          author: !author ? defaultError : '',
          url: !url ? defaultError : '',
        };
        const changed =
          (Object.keys(state) as Array<keyof ErrorProps>).filter((key) => state[key] !== updated[key]).length > 0;
        return changed ? updated : state;
      });
    }
  }, [title, author, url, firstSubmit]);

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
        <Button type="submit">Create</Button>
      </Form.Footer>
    </Form>
  );
});

BlogForm.displayName = 'BlogForm';

export default BlogForm;
