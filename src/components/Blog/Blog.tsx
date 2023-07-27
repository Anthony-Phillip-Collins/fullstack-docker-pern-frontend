import { useRef, useState } from 'react';
import { BlogAttributes, BlogUpdate } from '../../types/blog.type';
import Card from '../Card/Card';
import Editable, { EditableRef } from '../Editable/Editable';
import TextLink from '../TextLink/TextLink';
import { BlogAuthor, BlogBody, BlogLikes, BlogLinkContainer } from './Blog.styled';

export interface BlogCallbacks {
  onUpdate: (blog: BlogAttributes) => void;
  onDelete: (blog: BlogAttributes) => void;
}

interface Props extends BlogCallbacks {
  blog: BlogAttributes;
}

export interface BlogInnerProps {
  warning?: boolean;
}

const Blog = ({ blog, onUpdate, onDelete }: Props) => {
  const [editable, setEditable] = useState(false);
  const [warning, setWarning] = useState(false);

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
      onUpdate(data);
    }
  };

  const deleteHandler = () => {
    onDelete(blog);
  };

  return (
    <Card
      onSave={saveHandler}
      onDelete={deleteHandler}
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
            <TextLink href={blog.url} target="_blank" truncate {...tabIndex}>
              {blog.url}
            </TextLink>
          </BlogLinkContainer>
        )}
      </BlogBody>
    </Card>
  );
};

export default Blog;
