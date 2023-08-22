import { useEffect, useRef, useState } from 'react';
import { clearBlogError } from '../../app/features/blog.slice';
import { useAppDispatch } from '../../app/hooks';
import BlogCreateFormContainer from '../../components/BlogForm/BlogFormContainer';
import BlogList from '../../components/BlogList/BlogList';
import Container from '../../components/Container/Container';
import Expander, { ExpanderRef } from '../../components/Expander/Expander';
import IconButton from '../../components/IconButton/IconButton';
import BlogsFilter from '../../components/IconFilters/BlogsFilter';
import PageTitle from '../../components/PageTitle/PageTitle';
import useAuth from '../../hooks/useAuth';
import useBlogs from '../../hooks/useBlogs';
import theme from '../../styles/theme';
import { FormRef } from '../../components/Form/Form';

const BlogsPage = () => {
  const dispatch = useAppDispatch();
  const { data, refetch } = useBlogs();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [showMyBlogsOnly, setShowMyBlogsOnly] = useState(false);
  const expander = useRef<ExpanderRef>(null);
  const BlogCreateForm = useRef<FormRef>(null);

  const toggle = () => {
    if (open) {
      BlogCreateForm.current && BlogCreateForm.current.reset();
    }
    setOpen(!open);
    dispatch(clearBlogError());
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

  const blogs = showMyBlogsOnly ? user?.blogs || [] : data;
  const canFilter = user?.blogs && user.blogs?.length > 0;

  return (
    <Container>
      <PageTitle title={open ? 'Create blog' : `${showMyBlogsOnly ? 'My' : 'All'} Blogs`}>
        <>
          {user && (
            <IconButton
              iconProps={{ icon: open ? 'minus' : 'plus' }}
              onClick={toggle}
              label={open ? 'Cancel' : 'Add blog'}
              tooltipId={`add-blog`}
              tooltipProps={{ place: 'top' }}
            />
          )}

          {canFilter && (
            <BlogsFilter showMyBlogsOnly={showMyBlogsOnly} toggle={() => setShowMyBlogsOnly(!showMyBlogsOnly)} />
          )}
        </>
      </PageTitle>
      <Expander open={open} ref={expander}>
        <BlogCreateFormContainer
          onLayout={onLayout}
          onCancel={onCancel}
          onSuccess={onSuccess}
          ref={BlogCreateForm}
          style={{ paddingBottom: theme.spacing.xxl }}
        />
      </Expander>
      <BlogList data={blogs} />
    </Container>
  );
};

export default BlogsPage;
