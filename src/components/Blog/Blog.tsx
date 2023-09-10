import { Ref, forwardRef, useImperativeHandle, useRef, useState } from 'react';
import useInputErrors, { UseInputErrorFields } from '../../hooks/useInputErrors';
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

interface CardImplementer {
  onSave?: (data: BlogAttributes) => void;
  onDelete?: (data: BlogAttributes) => void;
  onMore?: (data: BlogAttributes) => void;
  onCancel?: () => void;
}

export interface BlogCallbacks extends CardImplementer {
  onLike?: (blog: BlogAttributes) => void;
  onBookmark?: (blog: BlogAttributes) => void;
  onRead?: (reading: Readings) => void;
}

export type BlogProps = Common &
  BlogCallbacks & {
    blog: BlogAttributes;
    user?: UserAttributes | null;
    bookmarked?: boolean;
    liked?: boolean;
    canEdit?: boolean;
    oneOfMany?: boolean;
    errors?: Error[] | null;
  };

export interface BlogInnerProps {
  warning?: boolean;
}

interface InputFields {
  title: string;
  author: string;
  url: string;
}

type InputErrorFields = InputFields & UseInputErrorFields;

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
      ...props
    }: BlogProps,
    ref: Ref<BlogRef>,
  ) => {
    const [editable, setEditable] = useState(false);
    const [warning, setWarning] = useState(false);
    const enableEdit = !!(canEdit && (onSave || onDelete));
    const tabIndex = { tabIndex: warning ? -1 : 0 };
    const cardRef = useRef<CardRef>(null);

    const title = useRef<EditableRef>(null);
    const author = useRef<EditableRef>(null);
    const url = useRef<EditableRef>(null);

    const [inputFields, setInputFields] = useState<InputErrorFields>({
      author: blog.author,
      title: blog.title,
      url: blog.url,
    });
    const { errors, hasErrors } = useInputErrors<InputErrorFields>({
      errors: errorArray,
      inputFields,
    });

    const updateInputFields = (key: keyof InputFields, value: string) => {
      const updated = { ...inputFields, [key]: value };
      setInputFields(updated);
    };

    const closeCard = () => {
      cardRef?.current?.close();
      cancel();
    };

    const save = () => {
      const update: BlogUpdate = {};

      if (title && title.current) {
        update.title = title.current.value;
      }

      if (author && author.current) {
        update.author = author.current.value;
      }

      if (url && url.current) {
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
      onLike && onLike(blog);
    };

    const bookmarkHandler: React.MouseEventHandler = (e) => {
      e.preventDefault();
      onBookmark && onBookmark(blog);
    };

    const readHandler: React.MouseEventHandler = (e) => {
      e.preventDefault();
      onRead && reading && onRead(reading);
    };

    const moreHandler: React.MouseEventHandler = (e) => {
      e.preventDefault();
      onMore && onMore(blog);
    };

    useImperativeHandle(
      ref,
      (): BlogRef => ({
        saved: closeCard,
      }),
    );

    if (!blog) return null;

    const createdAt = dateToString(blog.createdAt);
    const updatedAt = dateToString(blog.updatedAt);
    const reading = user?.readings?.find((reading) => reading.id === blog.id);
    const owned = (blog.ownerId && blog.ownerId === user?.id) || blog.owner?.id === user?.id;
    return (
      <Card
        enableEdit={enableEdit}
        onSave={save}
        onDelete={remove}
        onEdit={setEditable}
        onWarning={setWarning}
        onCancel={cancel}
        header={
          <Editable
            tagName="h2"
            ref={title}
            initialValue={blog.title}
            disabled={!editable}
            error={errors?.title}
            onUpdate={(value) => updateInputFields('title', value)}
            onEnter={() => save()}
            onEscape={closeCard}
            data-testid="blog-heading"
          />
        }
        uid={`${blog.id}`}
        ref={cardRef}
        disabled={hasErrors()}
        owned={owned}
        {...props}
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
              onUpdate={(value) => updateInputFields('author', value)}
              onEnter={() => save()}
              onEscape={closeCard}
            />
          </Styled.Author>
          <Styled.Likes>
            has <strong data-testid="likes">{blog.likes}</strong> likes
          </Styled.Likes>
          {editable ? (
            <Editable
              tagName="span"
              ref={url}
              initialValue={blog.url}
              disabled={!editable}
              error={errors?.url}
              onUpdate={(value) => updateInputFields('url', value)}
              onEnter={() => save()}
              onEscape={closeCard}
            />
          ) : (
            <Styled.LinkContainer>
              <ExternalLink href={blog.url} truncate {...tabIndex}>
                {blog.url}
              </ExternalLink>
            </Styled.LinkContainer>
          )}
          {blog.owner && (
            <div>
              owner: <InternalLink to={routerUtils.getUserPath(blog.owner.id)}>{blog.owner.name}</InternalLink>
            </div>
          )}

          {createdAt && <div>created: {createdAt}</div>}

          {updatedAt && <div>updated: {updatedAt}</div>}

          <Readers readers={blog.readers} />

          <CardStyled.IconControls>
            {onLike && (
              <IconButton
                iconProps={{ icon: liked ? 'unlike' : 'like' }}
                onClick={likeHandler}
                label={liked ? 'Remove like' : 'Add like'}
                tooltipId={`like${blog.id}`}
                {...tabIndex}
              />
            )}

            {onBookmark && (
              <IconButton
                iconProps={{ icon: bookmarked ? 'unbookmark' : 'bookmark' }}
                onClick={bookmarkHandler}
                label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
                tooltipId={`bookmark${blog.id}`}
                {...tabIndex}
                data-testid="bookmark"
              />
            )}

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
                data-testid="more"
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
