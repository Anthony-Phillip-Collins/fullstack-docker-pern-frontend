import IconButton from '../IconButton/IconButton';
import IconFilter, { IconFilterProps } from './IconFilter';

type FilterProps = React.HTMLAttributes<HTMLDivElement> &
  Pick<IconFilterProps, 'label'> & {
    showAuthUser: boolean;
    toggle: () => void;
  };

const UsersFilter = ({ showAuthUser, toggle, ...props }: FilterProps) => {
  return (
    <>
      <IconFilter {...props}>
        <IconButton
          iconProps={{ icon: 'person' }}
          onClick={() => toggle()}
          label={showAuthUser ? 'Show all users' : 'Show me'}
          tooltipId={`users-filter`}
          inverted={showAuthUser}
        />
      </IconFilter>
    </>
  );
};

export default UsersFilter;
