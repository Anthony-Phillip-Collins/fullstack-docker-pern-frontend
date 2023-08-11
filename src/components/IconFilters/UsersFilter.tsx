import IconButton from '../IconButton/IconButton';
import IconFilter from './IconFilter';

interface FilterProps extends React.HTMLAttributes<HTMLDivElement> {
  showAuthUser: boolean;
  toggle: () => void;
}

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
