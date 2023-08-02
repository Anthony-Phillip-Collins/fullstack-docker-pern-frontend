import { styled } from 'styled-components';
import IconShape, { IconProps } from '../IconShape/IconShape';
import mixins from '../../styles/mixins';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconProps: IconProps;
}

const Button = ({ iconProps, ...props }: Props) => {
  return (
    <button {...props}>
      <IconShape {...iconProps} />
    </button>
  );
};

const IconButton = styled(Button)`
  cursor: pointer;
  display: inline-block;
  background-color: transparent;
  padding: 0.6rem;
  color: inherit;
  border-style: solid;
  border-width: 0.2rem;
  border-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 4.2rem;
  max-width: 4.2rem;
  min-height: 3.2rem;
  min-width: 3.2rem;
  &:hover,
  &:focus {
    border-color: white;
  }

  ${() => ({
    ...mixins.transition('border-color'),
  })};
`;

export default IconButton;
