import { styled } from 'styled-components';
import InternalLink from '../Link/InternalLink';

const Nav = () => {
  return (
    <nav>
      <List>
        <li>
          <InternalLink to={`/`}>Home</InternalLink>
        </li>
        <li>
          <InternalLink to={`/blogs`}>Blogs</InternalLink>
        </li>
        <li>
          <InternalLink to={`/blogs/1`}>Single Blog</InternalLink>
        </li>
        <li>
          <InternalLink to={`/users`}>Users</InternalLink>
        </li>
        <li>
          <InternalLink to={`/users/1`}>Single User</InternalLink>
        </li>
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
