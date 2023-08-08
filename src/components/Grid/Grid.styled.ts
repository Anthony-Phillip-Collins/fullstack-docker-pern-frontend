import { styled } from 'styled-components';
import mixins from '../../styles/mixins';
import { GridItemProps, GridProps } from './Grid';
import theme from '../../styles/theme';

const gap = theme.spacing.md;

const Grid = styled.ul<GridProps>`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding: 0;
  list-style: none;
  ${() => ({
    margin: `-${gap}`,
  })}
`;

const GridItem = styled.li<GridItemProps>`
  display: flex;
  flex-basis: 100%;
  max-width: 100%;

  ${() => {
    return {
      margin: gap,

      ...mixins.media.md({
        flexBasis: `calc((100% / 2 - ${gap} * 2))`,
        maxWidth: `calc((100% / 2 - ${gap} * 2))`,
      }),

      ...mixins.media.lg({
        flexBasis: `calc((100% / 3 - ${gap} * 2))`,
        maxWidth: `calc((100% / 3 - ${gap} * 2))`,
      }),
    };
  }}
`;

const GridStyled = {
  Grid,
  GridItem,
};

export default GridStyled;
