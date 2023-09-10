import IconButton from '../IconButton/IconButton';
import IconFilter, { IconFilterProps } from './IconFilter';

type FilterProps = React.HTMLAttributes<HTMLDivElement> &
  Pick<IconFilterProps, 'label'> & {
    showRead: boolean;
    showUnread: boolean;
    toggleShowRead: () => void;
    toggleShowUnread: () => void;
  };

const BookmarksFilter = ({ showRead, showUnread, toggleShowRead, toggleShowUnread, ...props }: FilterProps) => {
  return (
    <>
      <IconFilter {...props}>
        <IconButton
          iconProps={{ icon: 'read' }}
          onClick={() => toggleShowRead()}
          label={showRead ? 'Remove filter for read' : 'Filter read'}
          tooltipId={`bookmarks-show-read`}
          inverted={showRead}
        />
        <IconButton
          iconProps={{ icon: 'unread' }}
          onClick={() => toggleShowUnread()}
          label={showUnread ? 'Remove filter for unread' : 'Filter unread'}
          tooltipId={`bookmarks-show-unread`}
          inverted={showUnread}
        />
      </IconFilter>
    </>
  );
};

export default BookmarksFilter;
