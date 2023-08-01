import { UserAttributes } from '../../types/user.type';
import InternalLink from '../Link/InternalLink';
import User, { UserCallbacks } from '../User/User';
import { ListItem, StyledList } from './UserList.styled';

interface Props extends UserCallbacks {
  data: UserAttributes[];
}

const UserList = ({ data, onSave, onDelete }: Props) => {
  return (
    data && (
      <StyledList>
        {data.map((user) => (
          <ListItem key={user.id}>
            <User user={user} onSave={onSave} onDelete={onDelete}>
              <div>
                <InternalLink to={`/users/${user.id}`}>Read more</InternalLink>
              </div>
            </User>
          </ListItem>
        ))}
      </StyledList>
    )
  );
};

export default UserList;
