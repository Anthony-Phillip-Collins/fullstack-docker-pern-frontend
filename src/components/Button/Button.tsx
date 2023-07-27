import { ColorVariants } from '../../styles/types';
import { StyledButton } from './Button.styled';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ColorVariants;
}

const Button = (props: ButtonProps) => <StyledButton {...props} />;

export default Button;
