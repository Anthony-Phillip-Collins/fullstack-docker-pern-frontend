import { css } from 'styled-components';
import { FontWeight } from '../../styles/types';
import mixins from '../../styles/mixins';

export const linkStyles = css`
  position: relative;
  display: inline-block;
  text-decoration: none;

  &::after {
    content: '';
    width: 100%;
    height: 1px;
    display: block;
    position: absolute;
    bottom: 0.3rem;
    transform: scaleX(0) translateX(50%);
  }

  &:hover,
  &:focus {
    &::after {
      transform: scaleX(1) translateX(0%);
    }
  }

  ${(props) => {
    const { theme } = props;

    return {
      ...theme.fonts.body,
      fontWeight: FontWeight.bold,
      color: theme.global.color,
      '&::after': {
        backgroundColor: theme.global.color,
        ...mixins.transition('transform'),
      },
    };
  }};
`;
