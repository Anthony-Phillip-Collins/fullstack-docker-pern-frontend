import MainStyled from './Main.styled';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const Main = ({ children }: Props) => {
  return <MainStyled>{children}</MainStyled>;
};

export default Main;
