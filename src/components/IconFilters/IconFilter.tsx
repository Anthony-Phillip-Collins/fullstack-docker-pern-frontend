import { styled } from 'styled-components';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const IconFilter = ({ children, ...props }: Props) => {
  return (
    <StyledIconFilter {...props}>
      <span>Filter: </span>
      {children}
    </StyledIconFilter>
  );
};

const StyledIconFilter = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.4);
  ${({ theme }) => ({
    padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
    borderRadius: theme.global.borderRadius,
  })};

  > button {
    margin-left: ${(props) => props.theme.spacing.xl};
  }
`;

export default IconFilter;
