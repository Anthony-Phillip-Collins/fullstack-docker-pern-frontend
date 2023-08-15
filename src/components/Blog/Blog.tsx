import { Ref, forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { routerUtils } from '../../routes';
import { BlogAttributes, BlogUpdate } from '../../types/blog.type';
import { Readings, UserAttributes } from '../../types/user.type';
import dateToString from '../../util/dateToString';
import Card, { CardRef } from '../Card/Card';
import CardStyled from '../Card/Card.styled';
import Editable, { EditableRef } from '../Editable/Editable';
import IconButton from '../IconButton/IconButton';
import ExternalLink from '../Link/ExternalLink';
import InternalLink from '../Link/InternalLink';
import BlogStyled from './Blog.styled';

interface Common extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export interface BlogCallbacks {
  onSave?: (blog: BlogAttributes) => void;
  onDelete?: (blog: BlogAttributes) => void;
  onCancel?: () => void;
  onLike: (blog: BlogAttributes) => void;
  onBookmark: (blog: BlogAttributes) => void;
  onRead: (reading: Readings) => void;
  onMore: (blog: BlogAttributes) => void;
}

export type BlogProps = Common & {
  blog: BlogAttributes;
  user?: UserAttributes | null;
  bookmarked?: boolean;
  liked?: boolean;
  canEdit?: boolean;
  oneOfMany?: boolean;
  errors?: Error[] | null;
};

type Props = BlogProps & BlogCallbacks;

export interface BlogInnerProps {
  warning?: boolean;
}

interface InputFields {
  title: string;
  author: string;
  url: string;
}

export interface BlogRef {
  saved: () => void;
}

const Styled = BlogStyled;

const Blog = forwardRef(
  (
    {
      children,
      user,
      blog,
      canEdit,
      bookmarked,
      liked,
      oneOfMany,
      errors: errorArray,
      onSave,
      onDelete,
      onCancel,
      onLike,
      onBookmark,
      onRead,
      onMore,
    }: Props,
    ref: Ref<BlogRef>,
  ) => {
    const [editable, setEditable] = useState(false);
    const [warning, setWarning] = useState(false);
    const enableEdit = !!(canEdit && (onSave || onDelete));
    const tabIndex = { tabIndex: warning ? -1 : 0 };
    const canLike = false; // implement later

    const cardRef = useRef<CardRef>(null);

    const title = useRef<EditableRef>(null);
    const author = useRef<EditableRef>(null);
    const url = useRef<EditableRef>(null);

    const initialErrors: InputFields = useMemo(
      () => ({
        title: '',
        author: '',
        url: '',
      }),
      [],
    );
    const [errors, setErrors] = useState<InputFields>(initialErrors);
    const hasErrors = () => {
      return Object.values(errors).some((error) => error !== '');
    };

    const save = () => {
      const update: BlogUpdate = {};

      if (title && title.current && title.current.value) {
        update.title = title.current.value;
      }

      if (author && author.current && author.current.value) {
        update.author = author.current.value;
      }

      if (url && url.current && url.current.value) {
        update.url = url.current.value;
      }

      if (Object.keys(update).length > 0) {
        const data: BlogAttributes = { ...blog, ...update };
        onSave && onSave(data);
      }
    };

    const remove = () => {
      onDelete && onDelete(blog);
    };

    const cancel = () => {
      onCancel && onCancel();
    };

    const likeHandler: React.MouseEventHandler = (e) => {
      e.preventDefault();
      onLike(blog);
    };

    const bookmarkHandler: React.MouseEventHandler = (e) => {
      e.preventDefault();
      onBookmark(blog);
    };

    const readHandler: React.MouseEventHandler = (e) => {
      e.preventDefault();
      onRead && reading && onRead(reading);
    };

    const moreHandler: React.MouseEventHandler = (e) => {
      e.preventDefault();
      onMore(blog);
    };

    const changeHandler = (key: keyof InputFields) => {
      setErrors((state) => {
        const input: InputFields = {
          author: author?.current?.value || '',
          title: title?.current?.value || '',
          url: url?.current?.value || '',
        };
        return updateErrorsOnInput(input, state, key);
      });
    };

    const updateErrorsOnInput = (input: InputFields, state: InputFields, current: keyof InputFields) => {
      const update = (key: keyof InputFields) => {
        if (key === current) {
          return input[key] ? '' : state[key] || 'This field is mandatory.';
        } else {
          return state[key];
        }
      };
      const keys = Object.keys(state) as Array<keyof InputFields>;
      const updated = keys.reduce((obj, key) => {
        obj[key] = update(key);
        return obj;
      }, {} as InputFields);
      const changed = keys.filter((key) => state[key] !== updated[key]).length > 0;
      return changed ? updated : state;
    };

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
      } else {
        setErrors(initialErrors);
      }
    }, [errorArray, initialErrors]);

    useImperativeHandle(
      ref,
      (): BlogRef => ({
        saved: () => {
          cardRef?.current?.close();
        },
      }),
    );

    if (!blog) return null;

    const createdAt = dateToString(blog.createdAt);
    const updatedAt = dateToString(blog.updatedAt);
    const reading = user?.readings?.find((reading) => reading.id === blog.id);

    return (
      <Card
        enableEdit={enableEdit}
        onSave={save}
        onDelete={remove}
        onCancel={cancel}
        onEdit={setEditable}
        onWarning={setWarning}
        header={
          <Editable
            tagName="h2"
            ref={title}
            initialValue={blog.title}
            disabled={!editable}
            error={errors?.title}
            onChange={() => changeHandler('title')}
          />
        }
        uid={`${blog.id}`}
        disabled={hasErrors()}
        ref={cardRef}
      >
        <Styled.Body>
          <Styled.Author>
            by &nbsp;
            <Editable
              tagName="span"
              ref={author}
              initialValue={blog.author}
              disabled={!editable}
              error={errors?.author}
              onChange={() => changeHandler('author')}
            />
          </Styled.Author>
          <Styled.Likes>
            has <strong>{blog.likes}</strong> likes
          </Styled.Likes>
          {editable ? (
            <Editable
              tagName="span"
              ref={url}
              initialValue={blog.url}
              disabled={!editable}
              error={errors?.url}
              onChange={() => changeHandler('url')}
            />
          ) : (
            <Styled.LinkContainer>
              <ExternalLink href={blog.url} truncate {...tabIndex}>
                {blog.url}
              </ExternalLink>
            </Styled.LinkContainer>
          )}

          <div>
            owner:{' '}
            {blog.owner && <InternalLink to={routerUtils.getUserPath(blog.owner.id)}>{blog.owner.name}</InternalLink>}
          </div>

          <div>{createdAt && <div>created: {createdAt}</div>}</div>

          <div>{updatedAt && <div>updated: {updatedAt}</div>}</div>

          <Readers readers={blog.readers} />

          <CardStyled.IconControls>
            {canLike && (
              <IconButton
                iconProps={{ icon: liked ? 'unlike' : 'like' }}
                onClick={likeHandler}
                label={liked ? 'Remove like' : 'Add like'}
                tooltipId={`like${blog.id}`}
                {...tabIndex}
              />
            )}

            <IconButton
              iconProps={{ icon: bookmarked ? 'unbookmark' : 'bookmark' }}
              onClick={bookmarkHandler}
              label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
              tooltipId={`bookmark${blog.id}`}
              {...tabIndex}
            />

            {reading && (
              <IconButton
                iconProps={{ icon: reading.reading.read ? 'read' : 'unread' }}
                onClick={readHandler}
                label={reading.reading.read ? 'Mark as unread' : 'Mark as read'}
                tooltipId={`read${blog.id}`}
                {...tabIndex}
              />
            )}

            {oneOfMany && (
              <IconButton
                iconProps={{ icon: 'more' }}
                onClick={moreHandler}
                label="Read more"
                tooltipId={`more${blog.id}`}
                {...tabIndex}
              />
            )}
          </CardStyled.IconControls>

          {children}

          {reading?.reading.read}
        </Styled.Body>
      </Card>
    );
  },
);

type ReadersProps = Pick<BlogAttributes, 'readers'>;

const Readers = ({ readers }: ReadersProps) => {
  if (!readers || readers.length === 0) {
    return null;
  }

  const items = readers.map((reader) => (
    <li key={reader.id}>
      <InternalLink to={routerUtils.getUserPath(reader.id)}>{reader.name}</InternalLink>
    </li>
  ));

  return (
    <Styled.Readers>
      <span>Readers:</span> <ul>{items}</ul>
    </Styled.Readers>
  );
};

Blog.displayName = 'Blog';

export default Blog;
