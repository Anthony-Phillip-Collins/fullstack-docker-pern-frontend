import { UserAttributes } from '../../types/user.type';
import User, { UserCallbacks } from '../User/User';
import { ListItem, StyledList } from './UserList.styled';

interface Props extends UserCallbacks {
  data: UserAttributes[];
}

const UserList = ({ data, onUpdate, onDelete }: Props) => {
  return (
    data && (
      <StyledList>
        {data.map((user) => (
          <ListItem key={user.id}>
            <User user={user} onUpdate={onUpdate} onDelete={onDelete} />
          </ListItem>
        ))}
      </StyledList>
    )
  );
};

export default UserList;
