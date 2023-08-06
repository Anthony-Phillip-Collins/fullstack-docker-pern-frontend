import { GridItem, StyledGrid } from './Grid.styled';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Grid = ({ children }: Props) => {
  return <StyledGrid>{children}</StyledGrid>;
};

Grid.Item = GridItem;

export default Grid;
