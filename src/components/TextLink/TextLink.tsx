import { styled } from 'styled-components';
import mixins from '../../styles/mixins';
import { FontWeight } from '../../styles/types';

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  truncate?: boolean;
}

const TextLink = styled.a.withConfig({
  shouldForwardProp: (prop) => !['truncate'].includes(prop),
})<Props>`
  ${(props) => {
    const { theme } = props;
    const truncate = props.truncate
      ? {
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        }
      : {};

    return {
      ...theme.fonts.body,
      fontWeight: FontWeight.medium,
      color: theme.global.color,
      position: 'relative',
      display: 'inline-block',
      textDecoration: 'inherit',
      '&::after': {
        content: '""',
        backgroundColor: theme.global.color,
        width: '100%',
        height: '1px',
        display: 'block',
        position: 'absolute',
        bottom: '0.3rem',
        ...mixins.transition('transform'),
        transform: 'scaleX(0) translateX(50%)',
      },
      '&:hover, &:focus': {
        '&::after': {
          transform: 'scaleX(1) translateX(0%)',
        },
      },
      cursor: 'pointer',
      ...truncate,
    };
  }};
`;

export default TextLink;
