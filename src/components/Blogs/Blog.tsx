import { useRef, useState } from 'react';
import { styled } from 'styled-components';
import { BlogAttributes, BlogUpdate } from '../../types/blog.type';
import Button from '../Button/Button';
import Editable, { EditableRef } from '../Editable/Editable';
import IconButton from '../IconButton/IconButton';
import TextLink from '../TextLink/TextLink';

export interface BlogCallbacks {
  onUpdate: (blog: BlogAttributes) => void;
  onDelete: (blog: BlogAttributes) => void;
}

interface Props extends BlogCallbacks {
  blog: BlogAttributes;
}

const Blog = ({ blog, onUpdate, onDelete }: Props) => {
  const [editable, setEditable] = useState(false);
  const [warning, setWarning] = useState(false);

  const title = useRef<EditableRef>(null);
  const author = useRef<EditableRef>(null);
  const url = useRef<EditableRef>(null);

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
    setWarning(true);
    // onDelete(blog);
  };

  const cancelHandler: React.MouseEventHandler = (e) => {
    e.preventDefault();
    setWarning(false);
  };

  const deleteForRealHandler: React.MouseEventHandler = (e) => {
    e.preventDefault();
    setEditable(false);
    setWarning(false);
    onDelete(blog);
  };

  return (
    <StyledBlog>
      {warning && (
        <Warning>
          <p>Are you sure you want to delete this blog?</p>
          <div>
            <Button variant="primary" aria-label="Delete blog" onClick={deleteForRealHandler}>
              Yep
            </Button>
            <Button variant="danger" aria-label="Cancel deletion of blog" onClick={cancelHandler}>
              Nope
            </Button>
          </div>
        </Warning>
      )}
      <BlogInner>
        <Header>
          <Editable tagName="h2" ref={title} initialValue={blog.title} disabled={!editable} />
          {editable ? (
            <IconButton
              iconProps={{ icon: 'cancel', size: 'xl' }}
              onClick={() => setEditable(false)}
              aria-label="Cancel edit"
            />
          ) : (
            <IconButton
              iconProps={{ icon: 'edit', size: 'xl' }}
              onClick={() => setEditable(true)}
              aria-label="Edit blog"
            />
          )}
        </Header>
        <Body>
          <h3>
            by <Editable tagName="span" ref={author} initialValue={blog.author} disabled={!editable} />
          </h3>
          <Likes>has {blog.likes} likes</Likes>

          {editable ? (
            <Editable tagName="span" ref={url} initialValue={blog.url} disabled={!editable} />
          ) : (
            <TextLink target="_blank" href={blog.url} truncate>
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

const StyledBlog = styled.article`
  position: relative;
  display: flex;
  flex-basis: 100%;
  overflow: hidden;
  margin: 0.5rem;
  ${({ theme }) => ({
    /* color: theme.primary.color, */
    borderRadius: theme.global.borderRadius,
  })};
`;

const Warning = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 1;

  p {
    margin-top: 0;
  }

  ${({ theme }) => ({
    padding: theme.spacing.md,
    button: {
      marginLeft: theme.spacing.xl,
      marginRight: theme.spacing.xl,
    },
  })};
`;

const BlogInner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0;
  /* filter: blur(0.2rem); */
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  ${({ theme }) => ({
    backgroundColor: theme.colors.grey,
    padding: theme.spacing.lg,
  })};

  h2 {
    margin: 0;
    padding: 0;
    text-overflow: ellipsis;
    overflow: hidden;
    background-color: transparent;
    color: inherit;

    ${({ theme }) => ({
      ...theme.fonts.h2,
      fontFamily: theme.global.fontFamily,
      marginRight: theme.spacing.lg,
    })};
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  ${({ theme }) => ({
    backgroundColor: theme.colors.greyVariant,
    padding: theme.spacing.lg,
  })};

  h3 {
    display: flex;
    margin: 0;
    padding: 0;

    span {
      margin-left: 0.5rem;
    }
  }

  a {
    align-self: flex-start;
  }
`;

const Likes = styled.p`
  margin: 0;
  padding: 0;
`;

const Edit = styled.div`
  display: flex;
  justify-content: space-between;
  ${({ theme }) => ({
    marginTop: theme.spacing.lg,
  })};
`;

export default Blog;
