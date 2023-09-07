import { styled } from 'styled-components';

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const Item = styled.li`
  display: flex;
  align-items: center;
  margin: 1rem;
  ${({ theme }) => ({
    padding: `${theme.spacing.md} ${theme.spacing.lg}`,
    backgroundColor: 'rgba(255,255,255,0.30)',
    borderRadius: theme.global.borderRadius,
  })}
`;

const Logo = styled.img`
  width: 4rem;
  height: auto;
  margin-right: 1rem;
`;

const StyledProjectTools = {
  List,
  Item,
  Logo,
};

export default StyledProjectTools;
