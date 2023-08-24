import { useParams } from 'react-router-dom';
import Container from '../../components/Container/Container';
import UserContainer from '../../components/User/UserContainer';
import useAuth from '../../hooks/useAuth';
import useUserById from '../../hooks/useUserById';
import { UserAttributes } from '../../types/user.type';
import NotFoundPage from '../errors/NotFound.page';
import theme from '../../styles/theme';
import { StatusCodes } from '../../types/errors.type';

const UserPage = () => {
  const params = useParams();
  const id: UserAttributes['id'] = (params.id && parseInt(params.id)) || -1;
  const { data: user, error, loading } = useUserById(id);
  const { user: authUser } = useAuth();

  if (error?.status === StatusCodes.NOT_FOUND) {
    return <NotFoundPage error={error} />;
  }

  if (loading) {
    return null;
  }

  return (
    <>
      {user && (
        <Container style={{ marginTop: theme.spacing.xxl }}>
          <UserContainer user={user} authUser={authUser} />
        </Container>
      )}
    </>
  );
};

export default UserPage;
