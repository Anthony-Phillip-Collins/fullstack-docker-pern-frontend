import { useEffect, useRef, useState } from 'react';
import { BlogFormRef } from '../../components/BlogForm/BlogForm';
import BlogFormContainer from '../../components/BlogForm/BlogFormContainer';
import BlogList from '../../components/BlogList/BlogList';
import Container from '../../components/Container/Container';
import Expander, { ExpanderRef } from '../../components/Expander/Expander';
import IconButton from '../../components/IconButton/IconButton';
import PageTitle from '../../components/PageTitle/PageTitle';
import useAuth from '../../hooks/useAuth';
import useBlogs from '../../hooks/useBlogs';
import theme from '../../styles/theme';

const BlogsPage = () => {
  const { data, refetch } = useBlogs();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const expander = useRef<ExpanderRef>(null);
  const blogForm = useRef<BlogFormRef>(null);

  const toggle = () => {
    if (open) {
      blogForm.current && blogForm.current.reset();
    }
    setOpen(!open);
  };

  const onLayout = () => {
    expander.current && expander.current.updateHeight();
  };

  const onCancel = () => {
    setOpen(false);
  };

  const onSuccess = () => {
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (!data) return null;

  return (
    <Container>
      <PageTitle title="Blogs">
        {user && (
          <IconButton
            iconProps={{ icon: open ? 'minus' : 'plus' }}
            onClick={toggle}
            label={open ? 'Cancel' : 'Add blog'}
            tooltipId={`add-blog`}
            tooltipProps={{ place: 'right' }}
          />
        )}
      </PageTitle>
      <Expander open={open} ref={expander}>
        <BlogFormContainer
          onLayout={onLayout}
          onCancel={onCancel}
          onSuccess={onSuccess}
          ref={blogForm}
          style={{ paddingBottom: theme.spacing.xxl }}
        />
      </Expander>
      <BlogList data={data} />
    </Container>
  );
};

export default BlogsPage;
