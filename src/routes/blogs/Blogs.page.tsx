import { useEffect, useRef, useState } from 'react';
import { clearBlogError } from '../../app/features/blog.slice';
import { useAppDispatch } from '../../app/hooks';
import BlogFormContainer from '../../components/BlogForm/BlogFormContainer';
import BlogList from '../../components/BlogList/BlogList';
import Container from '../../components/Container/Container';
import Expander, { ExpanderRef } from '../../components/Expander/Expander';
import { FormRef } from '../../components/Form/Form';
import IconButton from '../../components/IconButton/IconButton';
import BlogsFilter from '../../components/IconFilters/BlogsFilter';
import PageHeader from '../../components/PageHeader/PageHeader';
import useAuth from '../../hooks/useAuth';
import useBlogs from '../../hooks/useBlogs';
import theme from '../../styles/theme';

const BlogsPage = () => {
  const dispatch = useAppDispatch();
  const { data, refetch } = useBlogs();
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [showMyBlogsOnly, setShowMyBlogsOnly] = useState(false);
  const expander = useRef<ExpanderRef>(null);
  const BlogCreateForm = useRef<FormRef>(null);

  const toggle = () => {
    if (showForm) {
      BlogCreateForm.current && BlogCreateForm.current.reset();
    }
    setShowForm(!showForm);
    dispatch(clearBlogError());
  };

  const onLayout = () => {
    expander.current && expander.current.updateHeight();
  };

  const onCancel = () => {
    setShowForm(false);
  };

  const onSuccess = () => {
    setShowForm(false);
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (!data) return null;

  const blogs = showMyBlogsOnly ? user?.blogs || [] : data;
  const canFilter = user?.blogs && user.blogs?.length > 0;
  const filter = canFilter && (
    <BlogsFilter showMyBlogsOnly={showMyBlogsOnly} toggle={() => setShowMyBlogsOnly(!showMyBlogsOnly)} />
  );

  return (
    <Container>
      <PageHeader title={showForm ? 'Create blog' : `${showMyBlogsOnly ? 'My' : 'All'} Blogs`} childrenFar={filter}>
        {user && (
          <IconButton
            iconProps={{ icon: showForm ? 'minus' : 'plus' }}
            onClick={toggle}
            label={showForm ? 'Cancel' : 'Add blog'}
            tooltipId={`add-blog`}
            tooltipProps={{ place: 'top' }}
          />
        )}
      </PageHeader>

      <Expander open={showForm} ref={expander}>
        <BlogFormContainer
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
