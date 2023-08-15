import { useEffect, useRef, useState } from 'react';
import Container from '../../components/Container/Container';
import Expander, { ExpanderRef } from '../../components/Expander/Expander';
import IconButton from '../../components/IconButton/IconButton';
import PageTitle from '../../components/PageTitle/PageTitle';
import UserFormContainer from '../../components/UserForm/UserFormContainer';
import UserList from '../../components/UserList/UserList';
import useAuth from '../../hooks/useAuth';
import useUsers from '../../hooks/useUsers';
import theme from '../../styles/theme';
import UsersFilter from '../../components/IconFilters/UsersFilter';
import { FormRef } from '../../types/form.type';

const UsersPage = () => {
  const { data, refetch } = useUsers();
  const { user: authUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [showAuthUser, setShowAuthUser] = useState(false);
  const expander = useRef<ExpanderRef>(null);
  const userForm = useRef<FormRef>(null);

  const toggle = () => {
    if (open) {
      userForm.current && userForm.current.reset();
    }
    setOpen(!open);
  };

  const onLayout = () => {
    expander.current && expander.current.updateHeight();
  };

  const onCancel = () => {
    setOpen(false);
  };

  const onSuccess = () => {
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [refetch]);
  useEffect(() => {
    refetch();
  }, [refetch]);

  if (!data) return null;

  const canFilter = authUser && data?.length > 1;
  const users = authUser && showAuthUser ? data.filter((user) => authUser.id === user.id) : data;

  return (
    <Container>
      <PageTitle title={open ? 'Create user' : `${showAuthUser ? 'Me' : 'All Users'}`}>
        <>
          {authUser && (
            <IconButton
              iconProps={{ icon: open ? 'minus' : 'plus' }}
              onClick={toggle}
              label={open ? 'Cancel' : 'Add user'}
              tooltipId={`add-user`}
              tooltipProps={{ place: 'top' }}
            />
          )}
          {canFilter && <UsersFilter showAuthUser={showAuthUser} toggle={() => setShowAuthUser(!showAuthUser)} />}
        </>
      </PageTitle>
      <Expander open={open} ref={expander}>
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
