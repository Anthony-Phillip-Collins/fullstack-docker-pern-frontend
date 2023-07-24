import { styled } from 'styled-components';
import IconShape, { IconProps } from '../IconShape/IconShape';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconProps: IconProps;
}

const IconButtonComp = ({ iconProps, ...props }: Props) => {
  return (
    <button {...props}>
      <IconShape {...iconProps} />
    </button>
  );
};

const IconButton = styled(IconButtonComp)`
  border: none;
  cursor: pointer;
  display: inline-block;
  background-color: transparent;
  padding: 0;
  color: inherit;
  &:hover,
  &:focus {
    color: ${({ theme }) => theme.colors.primaryVariant};
  }
`;

export default IconButton;
