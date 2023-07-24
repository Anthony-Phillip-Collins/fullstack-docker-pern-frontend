import { BiSolidEdit as EditIcon } from 'react-icons/bi';
import { MdOutlineCancel as CancelIcon } from 'react-icons/md';
import { styled } from 'styled-components';
import theme from '../../styles/theme';
import mixins from '../../styles/mixins';

const icons = {
  edit: EditIcon,
  cancel: CancelIcon,
};

export interface IconProps extends React.SVGAttributes<SVGElement> {
  icon: keyof typeof icons;
  size?: keyof typeof theme.icons.size;
}

const IconComp = ({ icon, ...props }: IconProps) => {
  const Comp = icons[icon];
  return <Comp {...props} /> || null;
};

const IconShape = styled(IconComp).withConfig({
  shouldForwardProp: (prop) => !['size'].includes(prop),
})<IconProps>`
  ${({ theme, size }) => ({
    fontSize: theme.icons.size[size || 'md'],
    ...mixins.transition('color'),
  })}
`;

export default IconShape;
