import { useEffect, useState } from 'react';
import BlogList from '../../components/BlogList/BlogList';
import Container from '../../components/Container/Container';
import BookmarksFilter from '../../components/IconFilters/BookmarksFilter';
import PageTitle from '../../components/PageHeader/PageHeader';
import useReadings from '../../hooks/useReadings';

const BookmarksPage = () => {
  const { all, read, unread, refetch } = useReadings();
  const [showRead, setShowRead] = useState(true);
  const [showUnread, setShowUnread] = useState(true);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (!all) return null;

  const canFilter = read && unread && read.length > 0 && unread.length > 0;
  const filter = canFilter && (
    <BookmarksFilter
      label="Filter read/unread:"
      showRead={showRead}
      showUnread={showUnread}
      toggleShowRead={() => setShowRead(!showRead)}
      toggleShowUnread={() => setShowUnread(!showUnread)}
      className="filter"
    />
  );
  let blogs = all;
  let titlePrefix = '';

  if (canFilter) {
    titlePrefix = 'All';
    if (showRead && !showUnread) {
      blogs = read;
      titlePrefix = 'Read';
    } else if (!showRead && showUnread) {
      blogs = unread;
      titlePrefix = 'Unread';
    } else if (!showRead && !showUnread) {
      blogs = [];
      titlePrefix = 'No';
    }
  }

  return (
    <Container>
      <PageTitle title={`${titlePrefix} Bookmarks`} childrenFar={filter} />
      {blogs.length === 0 && <p>{canFilter ? 'Select at least one filter.' : 'No blogs have been bookmarked.'}</p>}
      <BlogList data={blogs} />
    </Container>
  );
};

export default BookmarksPage;
