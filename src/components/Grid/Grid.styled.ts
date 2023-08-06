import { styled } from 'styled-components';
import mixins from '../../styles/mixins';

const { media } = mixins;

export const StyledGrid = styled.ul`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 0;
  list-style: none;
  ${({ theme }) => ({
    margin: `0 -${theme.spacing.md}`,
  })}
`;

export const GridItem = styled.li`
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
