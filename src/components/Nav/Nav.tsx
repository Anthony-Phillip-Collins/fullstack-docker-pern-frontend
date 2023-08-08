import useAuth from '../../hooks/useAuth';
import Container from '../Container/Container';
import InternalLink from '../Link/InternalLink';
import LoginForm from '../LoginForm/LoginForm';
import NavStyled from './Nav.styled';

interface NavItem {
  to: string;
  label: string;
  auth?: boolean;
}

const Styled = NavStyled;

const Nav = () => {
  const { user } = useAuth();

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
    <Container>
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

        <LoginForm />
      </Styled.Nav>
    </Container>
  );
};

export default Nav;
