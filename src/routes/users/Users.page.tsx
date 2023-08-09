import Container from '../../components/Container/Container';
import UserList from '../../components/UserList/UserList';
import useAuth from '../../hooks/useAuth';
import useUsers from '../../hooks/useUsers';

const UsersPage = () => {
  const { data } = useUsers();
  const { user: authUser } = useAuth();

  if (!data) return null;

  return (
    <Container>
      <h1>Users</h1>
      <UserList users={data} authUser={authUser} />
    </Container>
  );
};

export default UsersPage;
