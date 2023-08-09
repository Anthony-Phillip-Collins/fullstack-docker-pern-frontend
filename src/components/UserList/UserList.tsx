import Grid from '../Grid/Grid';
import UserContainer, { UserContainerProps } from '../User/UserContainer';

interface Props {
  users: UserContainerProps['user'][];
  authUser?: UserContainerProps['authUser'];
}

const UserList = ({ users, authUser }: Props) => {
  return (
    users && (
      <Grid>
        {users.map((user) => (
          <Grid.Item key={user.id}>
            <UserContainer user={user} authUser={authUser} oneOfMany />
          </Grid.Item>
        ))}
      </Grid>
    )
  );
};

export default UserList;
