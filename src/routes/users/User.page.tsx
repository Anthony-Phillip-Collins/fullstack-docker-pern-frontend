import { useParams } from 'react-router-dom';
import userThunk from '../../app/features/user.slice';
import { useAppDispatch } from '../../app/hooks';
import Container from '../../components/Container/Container';
import User from '../../components/User/User';
import useNotification from '../../hooks/useNotification';
import useUserById from '../../hooks/useUserById';
import { UserAttributes } from '../../types/user.type';

const UserPage = () => {
  const params = useParams();
  const id: UserAttributes['id'] = (params.id && parseInt(params.id)) || -1;
  const { data } = useUserById(id);
  const { notifyAsync } = useNotification();

  const dispatch = useAppDispatch();

  const onSave = (user: UserAttributes) => {
    notifyAsync(dispatch(userThunk.updateOne(user)), `${user.username} saved.`);
  };

  const onDelete = (user: UserAttributes) => {
    notifyAsync(dispatch(userThunk.deleteOne(user.id)), `${user.username} deleted.`);
  };

  if (!data) return null;

  return (
    <Container>
      <User user={data} onSave={onSave} onDelete={onDelete} />
    </Container>
  );
};

export default UserPage;
