import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import WindowContext from '../../context/WindowContext';
import useAsyncHandler from '../../hooks/useAsyncHandler';
import useAuth from '../../hooks/useAuth';
import { routerUtils } from '../../routes';
import theme from '../../styles/theme';
import Button from '../Button/Button';
import Expander, { ExpanderRef } from '../Expander/Expander';
import LoginFormExpander, { ExpanderContainerRef } from '../LoginForm/LoginFormExpander';
import NavStyled from './Nav.styled';

interface NavItem {
  to: string;
  label: string;
  auth?: boolean;
}

export interface NavLinkType extends React.ComponentProps<typeof Link> {
  active?: boolean;
}

const Styled = NavStyled;

const Nav = () => {
  const { user, logOut } = useAuth();
  const { tryCatch } = useAsyncHandler();
  const [loginOpen, setLoginOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(true);
  const navRef = useRef<ExpanderRef>(null);
  const loginRef = React.useRef<ExpanderContainerRef>(null);
  const location = useLocation();
  const { isMobileWidth } = useContext(WindowContext);

  const onLogOut = () => {
    tryCatch(logOut(), 'Logged out.');
  };

  const onExpand = () => {
    setLoginOpen(true);
  };

  const onCollapse = () => {
    setLoginOpen(false);
    if (window.innerWidth <= theme.breakpoints.md) {
      setNavOpen(false);
    }
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

  useEffect(() => {
    setNavOpen(!isMobileWidth);
    navRef.current && navRef.current.updateHeight();
  }, [location.pathname, isMobileWidth]);

  return (
    <>
      <Styled.NavContainer className="nav-container">
        <Styled.Toggle className="nav-toggle">
          <Styled.ToggleButton
            iconProps={{ icon: navOpen ? 'close' : 'menu', size: 'xl' }}
            onClick={() => setNavOpen(!navOpen)}
            noBorder
          />
        </Styled.Toggle>

        <Expander open={navOpen} ref={navRef}>
          <Styled.Nav>
            <Styled.List>
              {items.map(({ auth, to, label }) => {
                if (auth && !user) {
                  return null;
                }

                const active = location.pathname === to;

                return (
                  <Styled.ListItem key={to}>
                    <Styled.Link to={to} active={active} tabIndex={active ? -1 : 0}>
                      {label}
                    </Styled.Link>
                  </Styled.ListItem>
                );
              })}
            </Styled.List>
            <>
              {user && <p>Logged in as {user.name}</p>}
              {user ? (
                <Button onClick={() => onLogOut()}>Log Out</Button>
              ) : (
                !loginOpen && <Button onClick={() => loginRef.current?.expand()}>Log In</Button>
              )}
            </>
          </Styled.Nav>
        </Expander>
      </Styled.NavContainer>

      <LoginFormExpander
        ref={loginRef}
        onExpand={onExpand}
        onCollapse={onCollapse}
        style={{ paddingBottom: theme.spacing.xxl }}
      />
    </>
  );
};

export default Nav;
