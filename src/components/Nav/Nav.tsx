import React, { useState } from 'react';
import { styled } from 'styled-components';
import useAuth from '../../hooks/useAuth';
import Button from '../Button/Button';
import Container from '../Container/Container';
import InternalLink from '../Link/InternalLink';
import LoginFormExpander, { ExpanderContainerRef } from '../LoginForm/LoginFormExpander';
import NavStyled from './Nav.styled';
import useNotification from '../../hooks/useNotification';

interface NavItem {
  to: string;
  label: string;
  auth?: boolean;
}

const Styled = NavStyled;

const Nav = () => {
  const { user, logOut } = useAuth();
  const { notifyAsync } = useNotification();
  const [open, setOpen] = useState(false);

  const ref = React.useRef<ExpanderContainerRef>(null);

  const onLogOut = () => {
    notifyAsync(logOut(), 'Logged out.');
  };

  const onExpand = () => {
    setOpen(true);
  };

  const onCollapse = () => {
    setOpen(false);
  };

  const items: NavItem[] = [
    {
      to: `/`,
      label: `Home`,
    },
    {
      to: `/blogs`,
      label: `Blogs`,
    },
    {
      to: `/bookmarks`,
      label: `Bookmarks`,
      auth: true,
    },
    {
      to: `/users`,
      label: `Users`,
    },
  ];

  return (
    <>
      <NavContainer>
        <Styled.Nav>
          <Styled.List>
            {items.map(({ auth, to, label }) => {
              if (auth && !user) {
                return null;
              }

              return (
                <Styled.ListItem key={to}>
                  <InternalLink to={to}>{label}</InternalLink>
                </Styled.ListItem>
              );
            })}
          </Styled.List>
          <div>
            {user ? (
              <Button onClick={() => onLogOut()}>Log Out</Button>
            ) : (
              !open && <Button onClick={() => ref.current?.expand()}>Log In</Button>
            )}
          </div>
        </Styled.Nav>
      </NavContainer>

      <LoginFormExpander ref={ref} onExpand={onExpand} onCollapse={onCollapse} />
    </>
  );
};

export const NavContainer = styled(Container)`
  ${({ theme }) => ({
    backgroundColor: theme.colors.darkVariant,
  })}
`;

export default Nav;
