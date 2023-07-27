import { styled } from 'styled-components';
import { TextLinkProps } from './TextLink';
import { FontWeight } from '../../styles/types';
import mixins from '../../styles/mixins';

export const StyledTextLink = styled.a.withConfig({
  shouldForwardProp: (prop) => !['truncate'].includes(prop),
})<TextLinkProps>`
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
    const truncate = !props.truncate
      ? {}
      : {
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        };

    return {
      ...theme.fonts.body,
      fontWeight: FontWeight.medium,
      color: theme.global.color,
      '&::after': {
        backgroundColor: theme.global.color,
        ...mixins.transition('transform'),
      },
      ...truncate,
    };
  }};
`;
