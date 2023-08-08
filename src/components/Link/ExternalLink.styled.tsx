import { styled } from 'styled-components';
import { linkStyles } from './InternalLink.styled';
import { ExternalLinkProps } from './ExternalLink';

export const ExternalLinkStyled = styled.a.withConfig({
  shouldForwardProp: (prop) => !['truncate'].includes(prop),
})<ExternalLinkProps>`
  ${linkStyles}
  ${(props) => {
    const truncate = !props.truncate
      ? {}
      : {
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        };

    return {
      ...truncate,
    };
  }};
`;
