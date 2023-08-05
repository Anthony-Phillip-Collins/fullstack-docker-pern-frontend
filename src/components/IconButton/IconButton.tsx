import { ITooltip, Tooltip } from 'react-tooltip';
import { styled } from 'styled-components';
import mixins from '../../styles/mixins';
import IconShape, { IconProps } from '../IconShape/IconShape';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  iconProps: IconProps;
  tooltipProps?: ITooltip;
  tooltipId?: string;
  label?: string;
  noBorder?: boolean;
}

const Button = (props: IconButtonProps) => {
  const { iconProps, tooltipProps, tooltipId, label, ...rest } = props;
  return (
    <>
      <button aria-label={label} data-tooltip-id={tooltipId} {...rest}>
        <IconShape {...iconProps} />
      </button>

      {tooltipId && <Tooltip id={tooltipId} place="top" variant="dark" content={label} {...tooltipProps} />}
    </>
  );
};

const IconButton = styled(Button).withConfig({
  shouldForwardProp: (prop) => !['noBorder'].includes(prop),
})<IconButtonProps>`
  cursor: pointer;
  display: inline-block;
  background-color: transparent;
  padding: 0.6rem;
  color: inherit;
  border-style: solid;
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

  ${({ noBorder }) => ({
    borderWidth: noBorder ? '0' : '0.2rem',
    ...mixins.transition('border-color'),
  })};
`;

export default IconButton;
