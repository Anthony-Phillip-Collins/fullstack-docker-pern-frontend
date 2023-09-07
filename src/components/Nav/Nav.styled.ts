import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import mixins from '../../styles/mixins';
import { FontWeight } from '../../styles/types';
import Container from '../Container/Container';
import IconButton from '../IconButton/IconButton';
import { NavLinkType } from './Nav';

const NavContainer = styled(Container)`
  ${({ theme }) => ({
    backgroundColor: theme.colors.darkVariant,
  })}

  /* NavContainerInner */
  > :first-child {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const Inner = styled.div`
  flex-grow: 1;
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  margin-right: 3rem;
  ${({ theme }) => ({
    padding: `${theme.spacing.xl} 0`,
  })}
`;

const BrandLink = styled(Link)`
  display: inline-flex;
`;

const Toggle = styled.div`
  display: flex;
  justify-content: flex-end;

  ${({ theme }) => ({
    padding: `${theme.spacing.xl} 0`,
    ...mixins.media.md({
      display: 'none',
    }),
  })}
`;

const ToggleButton = styled(IconButton)`
  margin-right: -1rem;
`;

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  ${({ theme }) => ({
    padding: `0 0 ${theme.spacing.xxl} 0`,
    ...mixins.media.md({
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: `${theme.spacing.xl} 0`,
    }),
  })};
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0;

  ${() => ({
    ...mixins.media.md({
      flexDirection: 'row',
    }),
  })}
`;

const ListItem = styled.li`
  text-align: right;
  ${({ theme }) => ({
    margin: `0 0 ${theme.spacing.xl} 0`,
    ...mixins.media.md({
      margin: `0 ${theme.spacing.xxl} 0 0`,
    }),
  })}
`;

const Config = styled.div`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
`;

const Info = styled.p`
  display: inline;
  text-align: right;
  ${({ theme }) => ({
    margin: `0 ${theme.spacing.xl} 0 0`,
  })};
`;

const NavLink = styled(Link).withConfig({
  shouldForwardProp: (prop) => !['active'].includes(prop),
})<NavLinkType>`
  position: relative;
  display: inline-block;
  text-decoration: none;
  outline: none;
  padding: 0.5rem 0 0.6rem;

  &::after,
  &::before {
    content: '';
    width: 100%;
    height: 1px;
    position: absolute;
    display: none;
    opacity: 0.6;
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
  }

  &:hover,
  &:focus {
    /* opacity: 1; */
    &::after,
    &::before {
      transform: scaleX(1) translateX(0%);
    }
  }

  ${(props) => {
    const { theme, active } = props;

    const pseudoStyle = {
      backgroundColor: theme.global.color,
      transform: active ? 'scaleX(1) translateX(0%)' : 'scaleX(0) translateX(50%)',
      ...mixins.transition('transform', 'opacity'),
      ...mixins.media.md({
        display: 'block',
      }),
    };

    return {
      ...theme.fonts.body,
      color: theme.global.color,
      '&::after': pseudoStyle,
      '&::before': pseudoStyle,
      pointerEvents: active ? 'none' : 'auto',
      opacity: active ? 1 : 0.8,
      fontWeight: active ? FontWeight.bold : FontWeight.medium,
    };
  }};
`;

const NavStyled = {
  NavContainer,
  Inner,
  Brand,
  BrandLink,
  Nav,
  Toggle,
  ToggleButton,
  List,
  ListItem,
  Link: NavLink,
  Config,
  Info,
};

export default NavStyled;
