import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { FontWeight } from '../../styles/types';
import mixins from '../../styles/mixins';

interface NavLinkProps extends React.ComponentProps<typeof Link> {
  active?: boolean;
}

const NavLink = styled(Link).withConfig({
  shouldForwardProp: (prop) => !['active'].includes(prop),
})<NavLinkProps>`
  position: relative;
  display: inline-block;
  text-decoration: none;
  outline: none;

  &::after,
  &::before {
    content: '';
    width: 100%;
    height: 1px;
    display: block;
    position: absolute;
  }

  &::after {
    bottom: -0.3rem;
  }

  &::before {
    top: -0.3rem;
  }

  &:hover,
  &:focus {
    opacity: 1;
    &::after,
    &::before {
      transform: scaleX(1) translateX(0%);
    }
  }

  ${(props) => {
    const { theme, active } = props;
    const pseudo = {
      backgroundColor: theme.global.color,
      transform: active ? 'scaleX(1) translateX(0%)' : 'scaleX(0) translateX(50%)',
      ...mixins.transition('transform', 'opacity'),
    };
    return {
      ...theme.fonts.body,
      color: theme.global.color,
      '&::after': pseudo,
      '&::before': pseudo,
      pointerEvents: active ? 'none' : 'auto',
      opacity: active ? 1 : 0.8,
      fontWeight: active ? FontWeight.bold : FontWeight.medium,
    };
  }};
`;

export default NavLink;
