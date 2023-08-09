import { styled } from 'styled-components';
import Container from '../Container/Container';

export interface ErrorComponentProps {
  title: string;
}

const ErrorComponent = ({ title }: ErrorComponentProps) => {
  return (
    <StyledErrorComponent>
      <h1>{title}</h1>
      <img src="/img/error.webp" alt="error" />
    </StyledErrorComponent>
  );
};

const StyledErrorComponent = styled(Container)`
  text-align: center;

  img {
    width: 100%;
    height: auto;
    max-width: 80rem;
    margin: 0 auto;
    display: block;
  }
`;

export default ErrorComponent;
