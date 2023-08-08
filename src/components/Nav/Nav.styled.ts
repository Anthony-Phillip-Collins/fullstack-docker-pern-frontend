import { styled } from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${({ theme }) => ({
    padding: `${theme.spacing.xl} 0`,
  })}
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
