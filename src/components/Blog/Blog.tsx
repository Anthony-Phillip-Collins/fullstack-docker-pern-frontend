import { useRef, useState } from 'react';
import authService from '../../services/auth.service';
import { BlogAttributes, BlogUpdate } from '../../types/blog.type';
import { dateToString } from '../../util';
import Card from '../Card/Card';
import Editable, { EditableRef } from '../Editable/Editable';
import { BlogAuthor, BlogBody, BlogLikes, BlogLinkContainer } from './Blog.styled';
import InternalLink from '../Link/InternalLink';
import ExternalLink from '../Link/ExternalLink';

export interface BlogCallbacks {
  onSave?: (blog: BlogAttributes) => void;
  onDelete?: (blog: BlogAttributes) => void;
}

interface Props extends BlogCallbacks {
  blog: BlogAttributes;
}

export interface BlogInnerProps {
  warning?: boolean;
}

const Blog = ({ blog, onSave, onDelete }: Props) => {
  const [editable, setEditable] = useState(false);
  const [warning, setWarning] = useState(false);
  const auth = blog.owner?.username === authService.getUser()?.username;

  console.log(!!(auth && (onSave || onDelete)), auth, onSave, onDelete);

  const enableEdit = !!(auth && (onSave || onDelete));

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

  if (!blog) return null;

  const createdAt = dateToString(blog.createdAt);

  return (
    <Card
      enableEdit={enableEdit}
      onSave={onSave && saveHandler}
      onDelete={onDelete && deleteHandler}
      onEdit={setEditable}
      onWarning={setWarning}
      header={<Editable tagName="h2" ref={title} initialValue={blog.title} disabled={!editable} />}
    >
      <BlogBody>
        <BlogAuthor>
          by &nbsp;
          <Editable tagName="span" ref={author} initialValue={blog.author} disabled={!editable} />
        </BlogAuthor>
        <BlogLikes>has {blog.likes} likes</BlogLikes>
        {editable ? (
          <Editable tagName="span" ref={url} initialValue={blog.url} disabled={!editable} />
        ) : (
          <BlogLinkContainer>
            <ExternalLink href={blog.url} truncate {...tabIndex}>
              {blog.url}
            </ExternalLink>
          </BlogLinkContainer>
        )}
        <div>{createdAt && <div>created: {createdAt}</div>}</div>
        <div>Owner?: {blog.owner && <InternalLink to={`/users/${blog.owner.id}`}>{blog.owner.name}</InternalLink>}</div>
        <Readers readers={blog.readers} />
      </BlogBody>
    </Card>
  );
};

type ReadersProps = Pick<BlogAttributes, 'readers'>;

const Readers = ({ readers }: ReadersProps) => {
  if (!readers || readers.length === 0) return 'No Readers';
  return readers.map((reader, i) => (
    <div key={i}>
      Readers:{' '}
      <div>
        <div>Name:{reader.name}</div>
        <div>Read:{reader.reading.read ? 'Yes' : 'No'}</div>
      </div>
    </div>
  ));
};

export default Blog;
