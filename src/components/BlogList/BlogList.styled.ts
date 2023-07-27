import { styled } from 'styled-components';
import mixins from '../../styles/mixins';

const { media } = mixins;

export const StyledList = styled.ul`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 0;
  margin: -0.5rem;
  list-style: none;
`;

export const ListItem = styled.li`
  display: flex;
  flex-basis: 100%;
  max-width: 100%;

  ${media.md`
    flex-basis: calc(100% / 2);
    max-width: calc(100% / 2);
  `}
  ${media.xl`
    flex-basis: calc(100% / 3);
    max-width: calc(100% / 3);
  `}
`;
