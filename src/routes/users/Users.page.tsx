import userThunk from '../../app/features/user.slice';
import { useAppDispatch } from '../../app/hooks';
import Container from '../../components/Container/Container';
import UserList from '../../components/UserList/UserList';
import useUsers from '../../hooks/useUsers';
import { UserAttributes } from '../../types/user.type';

const UsersPage = () => {
  const { data } = useUsers();

  const dispatch = useAppDispatch();

  const onSave = (user: UserAttributes) => {
    dispatch(userThunk.updateOne(user));
  };

  const onDelete = (user: UserAttributes) => {
    dispatch(userThunk.deleteOne(user.id));
  };

  return (
    <Container>
      <h1>Users</h1>
      <UserList data={data} onSave={onSave} onDelete={onDelete} />
    </Container>
  );
};

export default UsersPage;
