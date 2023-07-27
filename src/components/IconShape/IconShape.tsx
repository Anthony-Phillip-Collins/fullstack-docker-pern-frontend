import { BiSolidEdit as EditIcon } from 'react-icons/bi';
import { MdOutlineCancel as CancelIcon } from 'react-icons/md';
import { styled } from 'styled-components';
import mixins from '../../styles/mixins';
import theme from '../../styles/theme';

const icons = {
  edit: EditIcon,
  cancel: CancelIcon,
};

export interface IconProps extends React.SVGAttributes<SVGElement> {
  icon: keyof typeof icons;
  size?: keyof typeof theme.icons.size;
}

export const GetIcon = ({ icon, ...props }: IconProps) => {
  const Icon = icons[icon];
  return <Icon {...props} /> || null;
};

export const IconShape = styled(GetIcon).withConfig({
  shouldForwardProp: (prop) => !['size'].includes(prop),
})<IconProps>`
  ${({ theme, size }) => ({
    fontSize: theme.icons.size[size || 'md'],
    ...mixins.transition('color'),
  })}
`;

export default IconShape;
