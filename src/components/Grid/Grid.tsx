import GridStyled from './Grid.styled';

export interface GridProps extends React.HTMLAttributes<HTMLUListElement> {
  children: React.ReactNode;
}

export interface GridItemProps extends React.HTMLAttributes<HTMLLIElement> {
  children: React.ReactNode;
}

const Styled = GridStyled;

const Grid = ({ children, ...props }: GridProps) => {
  return <Styled.Grid {...props}>{children}</Styled.Grid>;
};

const GridItem = ({ children, ...props }: GridItemProps) => {
  return <Styled.GridItem {...props}>{children}</Styled.GridItem>;
};

Grid.Item = GridItem;

export default Grid;
