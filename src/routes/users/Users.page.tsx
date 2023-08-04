import userThunk from '../../app/features/user.slice';
import { useAppDispatch } from '../../app/hooks';
import Container from '../../components/Container/Container';
import UserList from '../../components/UserList/UserList';
import useNotification from '../../hooks/useNotification';
import useUsers from '../../hooks/useUsers';
import { UserAttributes } from '../../types/user.type';

const UsersPage = () => {
  const { data } = useUsers();
  const { notifyAsync } = useNotification();

  const dispatch = useAppDispatch();

  const onSave = (user: UserAttributes) => {
    notifyAsync(dispatch(userThunk.updateOne(user)), `${user.username} saved.`);
  };

  const onDelete = (user: UserAttributes) => {
    notifyAsync(dispatch(userThunk.deleteOne(user.id)), `${user.username} deleted.`);
  };

  return (
    <Container>
      <h1>Users</h1>
      <UserList data={data} onSave={onSave} onDelete={onDelete} />
    </Container>
  );
};

export default UsersPage;
