import { styled } from 'styled-components';
import mixins from '../../styles/mixins';

const Expander = styled.div`
  max-height: 0;
  overflow: hidden;
  ${() => ({
    ...mixins.transition('max-height'),
  })};
`;

const Inner = styled.div``;

const ExpanderStyled = {
  Expander,
  Inner,
};

export default ExpanderStyled;
