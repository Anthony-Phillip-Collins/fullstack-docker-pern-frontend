import { StyledGrid, StyledGridItem } from './Grid.styled';

export interface GridProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
}

export interface GridItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
}

const Grid = ({ children, ...props }: GridProps) => {
  return <StyledGrid {...props}>{children}</StyledGrid>;
};

const GridItem = ({ children, ...props }: GridItemProps) => {
  return <StyledGridItem {...props}>{children}</StyledGridItem>;
};

Grid.Item = GridItem;

export default Grid;
