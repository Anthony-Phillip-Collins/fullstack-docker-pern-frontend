import { useRef, useState } from 'react';
import { BlogAttributes, BlogUpdate } from '../../types/blog.type';
import Button from '../Button/Button';
import Editable, { EditableRef } from '../Editable/Editable';
import IconButton from '../IconButton/IconButton';
import TextLink from '../TextLink/TextLink';
import {
  BlogInner,
  Body,
  BodyHeading,
  Edit,
  Header,
  Likes,
  StyledBlog,
  Warning,
  WarningBody,
  WarningHeader,
  WarningInnner,
} from './Blog.styled';

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

  const title = useRef<EditableRef>(null);
  const author = useRef<EditableRef>(null);
  const url = useRef<EditableRef>(null);

  const tabIndex = { tabIndex: warning ? -1 : 0 };

  const updateHandler: React.MouseEventHandler = (e) => {
    e.preventDefault();
    setEditable(false);

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

  const deleteHandler: React.MouseEventHandler = (e) => {
    e.preventDefault();
    setEditable(false);
    setWarning(true);
  };

  const cancelHandler: React.MouseEventHandler = (e) => {
    e.preventDefault();
    setEditable(true);
    setWarning(false);
  };

  const deleteForRealHandler: React.MouseEventHandler = (e) => {
    e.preventDefault();
    setWarning(false);
    onDelete(blog);
  };

  return (
    <StyledBlog>
      {warning && (
        <Warning>
          <WarningInnner>
            <WarningHeader>Are you sure you want to delete this blog?</WarningHeader>
            <WarningBody>
              <Button
                variant="primary"
                aria-label="Delete blog"
                onClick={deleteForRealHandler}
                className="c-blog__warning__button-delete"
              >
                Yep
              </Button>
              <Button
                variant="danger"
                aria-label="Cancel deletion of blog"
                onClick={cancelHandler}
                className="c-blog__warning__button-cancel"
              >
                Nope
              </Button>
            </WarningBody>
          </WarningInnner>
        </Warning>
      )}
      <BlogInner warning={warning}>
        <Header>
          <Editable tagName="h2" ref={title} initialValue={blog.title} disabled={!editable} className="c-blog__title" />
          {editable ? (
            <IconButton
              iconProps={{ icon: 'cancel', size: 'xl' }}
              onClick={() => setEditable(false)}
              aria-label="Cancel edit"
              {...tabIndex}
            />
          ) : (
            <IconButton
              iconProps={{ icon: 'edit', size: 'xl' }}
              onClick={() => setEditable(true)}
              aria-label="Edit blog"
              {...tabIndex}
            />
          )}
        </Header>
        <Body>
          <BodyHeading>
            by{' '}
            <Editable
              tagName="span"
              ref={author}
              initialValue={blog.author}
              disabled={!editable}
              className="c-blog__author"
            />
          </BodyHeading>

          <Likes>has {blog.likes} likes</Likes>

          {editable ? (
            <Editable tagName="span" ref={url} initialValue={blog.url} disabled={!editable} />
          ) : (
            <TextLink target="_blank" href={blog.url} truncate {...tabIndex} className="c-blog__url-link">
              {blog.url}
            </TextLink>
          )}

          {editable && (
            <Edit>
              <Button variant="primary" aria-label="Save blog" onClick={updateHandler}>
                Save
              </Button>
              <Button variant="danger" aria-label="Delete blog" onClick={deleteHandler}>
                Delete
              </Button>
            </Edit>
          )}
        </Body>
      </BlogInner>
    </StyledBlog>
  );
};

export default Blog;
