import { MdOutlineEdit as EditIcon, MdOutlineEditOff as EditOffIcon } from 'react-icons/md';
import { IoMdClose as CloseIcon } from 'react-icons/io';
import { FiPlus as PlusIcon, FiMinus as MinusIcon, FiCheck as CheckIcon } from 'react-icons/fi';
import { AiOutlineHeart as HeartOutline, AiFillHeart as HeartFill } from 'react-icons/ai';
import { styled } from 'styled-components';
import mixins from '../../styles/mixins';
import theme from '../../styles/theme';

const icons = {
  edit: EditIcon,
  editOff: EditOffIcon,
  close: CloseIcon,
  plus: PlusIcon,
  minus: MinusIcon,
  bookmark: PlusIcon,
  unbookmark: CheckIcon,
  like: HeartOutline,
  unlike: HeartFill,
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
