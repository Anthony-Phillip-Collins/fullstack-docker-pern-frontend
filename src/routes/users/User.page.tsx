import { useParams } from 'react-router-dom';
import Container from '../../components/Container/Container';
import UserContainer from '../../components/User/UserContainer';
import useAuth from '../../hooks/useAuth';
import useUserById from '../../hooks/useUserById';
import { UserAttributes } from '../../types/user.type';
import NotFoundPage from '../errors/NotFound.page';

const UserPage = () => {
  const params = useParams();
  const id: UserAttributes['id'] = (params.id && parseInt(params.id)) || -1;
  const { data: user, error } = useUserById(id);
  const { user: authUser } = useAuth();

  if (error) {
    return <NotFoundPage error={error} />;
  }

  return (
    <>
      {user && (
        <Container>
          <UserContainer user={user} authUser={authUser} />
        </Container>
      )}
    </>
  );
};

export default UserPage;
