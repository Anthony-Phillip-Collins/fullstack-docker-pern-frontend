import { useRef, useState } from 'react';
import { BlogAttributes, BlogUpdate } from '../../types/blog.type';
import { dateToString } from '../../util';
import Card from '../Card/Card';
import Editable, { EditableRef } from '../Editable/Editable';
import IconButton from '../IconButton/IconButton';
import ExternalLink from '../Link/ExternalLink';
import InternalLink from '../Link/InternalLink';
import { BlogAuthor, BlogBody, BlogLikes, BlogLinkContainer, IconControls } from './Blog.styled';
import { Tooltip } from 'react-tooltip';

interface Common extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

export interface BlogCallbacks {
  onSave?: (blog: BlogAttributes) => void;
  onDelete?: (blog: BlogAttributes) => void;
  onLike: (blog: BlogAttributes) => void;
  onBookmark: (blog: BlogAttributes) => void;
  onMore: (blog: BlogAttributes) => void;
}

export type BlogProps = Common & {
  blog: BlogAttributes;
  canEdit?: boolean;
  bookmarked?: boolean;
  liked?: boolean;
  single?: boolean;
};

type Props = BlogProps & BlogCallbacks;

export interface BlogInnerProps {
  warning?: boolean;
}

const Blog = ({
  children,
  blog,
  canEdit,
  bookmarked,
  liked,
  single,
  onSave,
  onDelete,
  onLike,
  onBookmark,
  onMore,
}: Props) => {
  const [editable, setEditable] = useState(false);
  const [warning, setWarning] = useState(false);

  const enableEdit = !!(canEdit && (onSave || onDelete));
  const tabIndex = { tabIndex: warning ? -1 : 0 };

  const title = useRef<EditableRef>(null);
  const author = useRef<EditableRef>(null);
  const url = useRef<EditableRef>(null);

  const saveHandler = () => {
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

  const deleteHandler = () => {
    onDelete && onDelete(blog);
  };

  const likeHandler: React.MouseEventHandler = (e) => {
    e.preventDefault();
    onLike(blog);
  };

  const bookmarkHandler: React.MouseEventHandler = (e) => {
    e.preventDefault();
    onBookmark(blog);
  };

  const moreHandler: React.MouseEventHandler = (e) => {
    e.preventDefault();
    onMore(blog);
  };

  if (!blog) return null;

  const createdAt = dateToString(blog.createdAt);
  const updatedAt = dateToString(blog.updatedAt);

  const likeConfig = {
    id: `like${blog.id}`,
    label: liked ? 'Remove like' : 'Add like',
  };

  const bookmarkConfig = {
    id: `bookmark${blog.id}`,
    label: bookmarked ? 'Remove bookmark' : 'Add bookmark',
  };

  const moreConfig = {
    id: `more${blog.id}`,
    label: 'Read more',
  };

  return (
    <Card
      enableEdit={enableEdit}
      onSave={onSave && saveHandler}
      onDelete={onDelete && deleteHandler}
      onEdit={setEditable}
      onWarning={setWarning}
      header={<Editable tagName="h2" ref={title} initialValue={blog.title} disabled={!editable} />}
      uid={`${blog.id}`}
    >
      <BlogBody>
        <BlogAuthor>
          by &nbsp;
          <Editable tagName="span" ref={author} initialValue={blog.author} disabled={!editable} />
        </BlogAuthor>
        <BlogLikes>
          has <strong>{blog.likes}</strong> likes
        </BlogLikes>
        {editable ? (
          <Editable tagName="span" ref={url} initialValue={blog.url} disabled={!editable} />
        ) : (
          <BlogLinkContainer>
            <ExternalLink href={blog.url} truncate {...tabIndex}>
              {blog.url}
            </ExternalLink>
          </BlogLinkContainer>
        )}

        <div>owner: {blog.owner && <InternalLink to={`/users/${blog.owner.id}`}>{blog.owner.name}</InternalLink>}</div>

        <div>{createdAt && <div>created: {createdAt}</div>}</div>

        <div>{updatedAt && <div>updated: {updatedAt}</div>}</div>

        <Readers readers={blog.readers} />

        <IconControls>
          <IconButton
            iconProps={{ icon: liked ? 'unlike' : 'like' }}
            onClick={likeHandler}
            aria-label={likeConfig.label}
            data-tooltip-id={likeConfig.id}
            {...tabIndex}
          />

          <IconButton
            iconProps={{ icon: bookmarked ? 'unbookmark' : 'bookmark' }}
            onClick={bookmarkHandler}
            aria-label={bookmarkConfig.label}
            data-tooltip-id={bookmarkConfig.id}
            {...tabIndex}
          />

          {!single && (
            <>
              <IconButton
                iconProps={{ icon: 'more' }}
                onClick={moreHandler}
                aria-label={moreConfig.label}
                data-tooltip-id={moreConfig.id}
                {...tabIndex}
              />
              <Tooltip id={moreConfig.id} place="top" variant="dark" content={moreConfig.label} />
            </>
          )}

          <Tooltip id={likeConfig.id} place="top" variant="dark" content={likeConfig.label} />
          <Tooltip id={bookmarkConfig.id} place="top" variant="dark" content={bookmarkConfig.label} />
        </IconControls>

        {children}
      </BlogBody>
    </Card>
  );
};

type ReadersProps = Pick<BlogAttributes, 'readers'>;

const Readers = ({ readers }: ReadersProps) => {
  if (!readers || readers.length === 0) {
    return null;
  }

  const items = readers.map((reader, i) => (
    <li key={i}>
      <span>
        {reader.name} - {reader.reading.read ? 'has read it.' : 'hasn’t read it yet.'}
      </span>
    </li>
  ));

  return (
    <>
      Readers:
      <ul>{items}</ul>
    </>
  );
};

export default Blog;
