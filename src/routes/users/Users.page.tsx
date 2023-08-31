import { useEffect, useRef, useState } from 'react';
import Container from '../../components/Container/Container';
import Expander, { ExpanderRef } from '../../components/Expander/Expander';
import IconButton from '../../components/IconButton/IconButton';
import UserFormContainer from '../../components/UserForm/UserFormContainer';
import UserList from '../../components/UserList/UserList';
import useAuth from '../../hooks/useAuth';
import useUsers from '../../hooks/useUsers';
import theme from '../../styles/theme';
import UsersFilter from '../../components/IconFilters/UsersFilter';
import { FormRef } from '../../components/Form/Form';
import PageHeader from '../../components/PageHeader/PageHeader';

const UsersPage = () => {
  const { data, refetch } = useUsers();
  const { user: authUser } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [showAuthUser, setShowAuthUser] = useState(false);
  const expander = useRef<ExpanderRef>(null);
  const userForm = useRef<FormRef>(null);

  const toggle = () => {
    if (showForm) {
      userForm.current && userForm.current.reset();
    }
    setShowForm(!showForm);
  };

  const onLayout = () => {
    expander.current && expander.current.updateHeight();
  };

  const onCancel = () => {
    setShowForm(false);
  };

  const onSuccess = () => {
    setShowForm(false);
  };

  useEffect(() => {
    refetch();
  }, [refetch]);
  useEffect(() => {
    refetch();
  }, [refetch]);

  if (!data) return null;

  const canFilter = authUser && data?.length > 1;
  const filter = canFilter && <UsersFilter showAuthUser={showAuthUser} toggle={() => setShowAuthUser(!showAuthUser)} />;
  const users = authUser && showAuthUser ? data.filter((user) => authUser.id === user.id) : data;

  return (
    <Container>
      <PageHeader title={showForm ? 'Create user' : `${showAuthUser ? 'Me' : 'All Users'}`} childrenFar={filter}>
        {authUser && authUser.admin && (
          <IconButton
            iconProps={{ icon: showForm ? 'minus' : 'plus' }}
            onClick={toggle}
            label={showForm ? 'Cancel' : 'Add user'}
            tooltipId={`add-user`}
            tooltipProps={{ place: 'top' }}
          />
        )}
      </PageHeader>
      <Expander open={showForm} ref={expander}>
        <UserFormContainer
          onLayout={onLayout}
          onCancel={onCancel}
          onSuccess={onSuccess}
          ref={userForm}
          style={{ paddingBottom: theme.spacing.xxl }}
        />
      </Expander>
      <UserList users={users} authUser={authUser} />
    </Container>
  );
};

export default UsersPage;
