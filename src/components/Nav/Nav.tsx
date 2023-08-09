import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import useAuth from '../../hooks/useAuth';
import useNotification from '../../hooks/useNotification';
import { routerUtils } from '../../routes';
import Button from '../Button/Button';
import Container from '../Container/Container';
import LoginFormExpander, { ExpanderContainerRef } from '../LoginForm/LoginFormExpander';
import NavStyled from './Nav.styled';
import NavLink from './NavLink';

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
  const location = useLocation();

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
      to: routerUtils.getHomePath(),
      label: `Home`,
    },
    {
      to: routerUtils.getBlogsPath(),
      label: `Blogs`,
    },
    {
      to: routerUtils.getBookmarksPath(),
      label: `Bookmarks`,
      auth: true,
    },
    {
      to: routerUtils.getUsersPath(),
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

              const active = location.pathname === to;

              return (
                <Styled.ListItem key={to}>
                  <NavLink to={to} active={active} tabIndex={active ? -1 : 0}>
                    {label}
                  </NavLink>
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
