import { useRef, useState } from 'react';
import BlogFormContainer from '../../components/BlogForm/BlogFormContainer';
import BlogList from '../../components/BlogList/BlogList';
import Container from '../../components/Container/Container';
import Expander, { ExpanderRef } from '../../components/Expander/Expander';
import IconButton from '../../components/IconButton/IconButton';
import useBlogs from '../../hooks/useBlogs';
import BlogsHeading from '../../components/BlogsHeading/BlogsHeading';

const BlogsPage = () => {
  const { data } = useBlogs();
  const [open, setOpen] = useState(false);
  const expander = useRef<ExpanderRef>(null);

  const onAdd = () => {
    setOpen(!open);
  };

  const onLayout = () => {
    expander.current && expander.current.updateHeight();
  };

  const onCancel = () => {
    setOpen(false);
  };

  if (!data) return null;

  return (
    <Container>
      <BlogsHeading title="Blogs">
        <IconButton
          iconProps={{ icon: open ? 'minus' : 'plus' }}
          onClick={onAdd}
          label={open ? 'Cancel' : 'Add blog'}
          tooltipId={`add-blog`}
          tooltipProps={{ place: 'right' }}
        />
      </BlogsHeading>
      <Expander open={open} ref={expander}>
        <BlogFormContainer onLayout={onLayout} onCancel={onCancel} />
      </Expander>
      <BlogList data={data} />
    </Container>
  );
};

export default BlogsPage;
