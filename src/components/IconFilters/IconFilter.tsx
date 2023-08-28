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
  border-radius: ${(props) => props.theme.global.borderRadius};
  padding: ${(props) => props.theme.spacing.lg};

  > button {
    margin-left: ${(props) => props.theme.spacing.xl};
  }
`;

export default IconFilter;
