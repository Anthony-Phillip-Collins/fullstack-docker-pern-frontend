import { ComponentProps, useContext, useEffect, useRef, useState } from 'react';
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
import ACLogo from '../ACLogo/ACLogo';

interface NavItem {
  to: string;
  label: string;
  auth?: boolean;
}

export interface NavLinkType extends ComponentProps<typeof Link> {
  active?: boolean;
}

const Styled = NavStyled;

const Nav = () => {
  const { user, logOut } = useAuth();
  const { tryCatch } = useAsyncHandler();
  const [loginOpen, setLoginOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(true);
  const navExpander = useRef<ExpanderRef>(null);
  const loginExpander = useRef<ExpanderContainerRef>(null);
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
    navExpander.current && navExpander.current.updateHeight();
  }, [location.pathname, isMobileWidth]);

  return (
    <>
      <Styled.NavContainer className="nav-container">
        <Styled.Brand>
          <Styled.BrandLink href="https://anthonycollins.net" target="_blank" rel="noreferrer">
            <ACLogo />
          </Styled.BrandLink>
        </Styled.Brand>
        <Styled.Inner className="nav-container-inner">
          <Styled.Toggle className="nav-toggle">
            <Styled.ToggleButton
              iconProps={{ icon: navOpen ? 'close' : 'menu', size: 'xl' }}
              onClick={() => setNavOpen(!navOpen)}
              noBorder
            />
          </Styled.Toggle>

          <Expander open={navOpen} disabled={!isMobileWidth} ref={navExpander}>
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
              <Styled.Config>
                {user && (
                  <Styled.Info>
                    Logged in as <strong>{user.name}</strong>
                  </Styled.Info>
                )}
                {user ? (
                  <Button onClick={() => onLogOut()} data-testid="logout-button">
                    Log Out
                  </Button>
                ) : (
                  !loginOpen && (
                    <Button onClick={() => loginExpander.current?.expand()} data-testid="login-expand-button">
                      Log In
                    </Button>
                  )
                )}
              </Styled.Config>
            </Styled.Nav>
          </Expander>
        </Styled.Inner>
      </Styled.NavContainer>

      <LoginFormExpander
        ref={loginExpander}
        onExpand={onExpand}
        onCollapse={onCollapse}
        style={{ paddingBottom: theme.spacing.xxl }}
      />
    </>
  );
};

export default Nav;
