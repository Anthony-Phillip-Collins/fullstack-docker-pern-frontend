import { styled } from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

const List = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  ${({ theme }) => ({
    padding: `0 ${theme.spacing.xl} 0 0`,
  })}
`;

const NavStyled = {
  Nav,
  List,
  ListItem,
};

export default NavStyled;
