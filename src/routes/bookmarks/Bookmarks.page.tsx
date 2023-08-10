import { useEffect, useState } from 'react';
import BlogList from '../../components/BlogList/BlogList';
import Container from '../../components/Container/Container';
import IconButton from '../../components/IconButton/IconButton';
import PageTitle from '../../components/PageTitle/PageTitle';
import useReadings from '../../hooks/useReadings';
import theme from '../../styles/theme';

const BookmarksPage = () => {
  const { all, read, unread, refetch } = useReadings();
  const [showRead, setShowRead] = useState(true);
  const [showUnread, setShowUnread] = useState(false);

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (!all) return null;

  const canFilter = read && unread && read.length > 0 && unread.length > 0;

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
      <PageTitle title={`${titlePrefix} Bookmarks`} style={{ justifyContent: 'space-between' }}>
        {canFilter && (
          <Filter
            showRead={showRead}
            showUnread={showUnread}
            toggleShowRead={() => setShowRead(!showRead)}
            toggleShowUnread={() => setShowUnread(!showUnread)}
            className="filter"
          />
        )}
      </PageTitle>
      {blogs.length === 0 && <p>{canFilter ? 'Select at least one filter.' : 'No blogs have been bookmarked.'}</p>}
      <BlogList data={blogs} />
    </Container>
  );
};

interface FilterProps extends React.HTMLAttributes<HTMLDivElement> {
  showRead: boolean;
  showUnread: boolean;
  toggleShowRead: () => void;
  toggleShowUnread: () => void;
}

const Filter = ({ showRead, showUnread, toggleShowRead, toggleShowUnread, ...props }: FilterProps) => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid rgba(255, 255, 255, 0.6)',
          borderRadius: theme.global.borderRadius,
          padding: theme.spacing.xl,
        }}
        {...props}
      >
        <span>Filter: </span>
        <IconButton
          iconProps={{ icon: 'read' }}
          onClick={() => toggleShowRead()}
          label={showRead ? 'Remove filter for read' : 'Filter read'}
          tooltipId={`bookmarks-show-read`}
          inverted={showRead}
          style={{ marginLeft: theme.spacing.xl }}
        />
        <IconButton
          iconProps={{ icon: 'unread' }}
          onClick={() => toggleShowUnread()}
          label={showUnread ? 'Remove filter for unread' : 'Filter unread'}
          tooltipId={`bookmarks-show-unread`}
          inverted={showUnread}
          style={{ marginLeft: theme.spacing.xl }}
        />
      </div>
    </>
  );
};

export default BookmarksPage;
