import { useParams } from 'react-router-dom';
import Container from '../../components/Container/Container';
import UserContainer from '../../components/User/UserContainer';
import useUserById from '../../hooks/useUserById';
import { UserAttributes } from '../../types/user.type';
import useAuth from '../../hooks/useAuth';

const UserPage = () => {
  const params = useParams();
  const id: UserAttributes['id'] = (params.id && parseInt(params.id)) || -1;
  const { data } = useUserById(id);
  const { user: authUser } = useAuth();
  if (!data) return null;

  return (
    <Container>
      <UserContainer user={data} authUser={authUser} />
    </Container>
  );
};

export default UserPage;
