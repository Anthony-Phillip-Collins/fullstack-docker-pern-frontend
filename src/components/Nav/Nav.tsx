import { styled } from 'styled-components';
import InternalLink from '../Link/InternalLink';
import useAuth from '../../hooks/useAuth';

interface NavItem {
  to: string;
  label: string;
  auth?: boolean;
}

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
    <nav>
      <List>
        {items.map(({ auth, to, label }) => {
          if (auth && !user) {
            return null;
          }

          return (
            <li key={to}>
              <InternalLink to={to}>{label}</InternalLink>
            </li>
          );
        })}
      </List>
    </nav>
  );
};

const List = styled.ul`
  background-color: ${(props) => props.theme.colors.grey};
  display: flex;
  list-style: none;

  li {
    padding: 1rem;
  }
`;

export default Nav;
