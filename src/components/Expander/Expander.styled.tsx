import { styled } from 'styled-components';
import mixins from '../../styles/mixins';

export const ExpanderWrapper = styled.div`
  max-height: 0;
  overflow: hidden;
  ${() => ({
    ...mixins.transition('max-height'),
  })};
`;

export const ExpanderInner = styled.div`
  ${({ theme }) => ({
    paddingBottom: `${theme.spacing.xxl}`,
  })}
`;
