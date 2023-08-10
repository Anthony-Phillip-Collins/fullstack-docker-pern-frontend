import { AiFillHeart as HeartFill, AiOutlineHeart as HeartOutline, AiOutlineMenu as MenuIcon } from 'react-icons/ai';
import { CiRead as ReadIcon, CiUnread as UnreadIcon } from 'react-icons/ci';
import {
  FiCheck as CheckIcon,
  FiChevronRight as ChevronRightIcon,
  FiMinus as MinusIcon,
  FiPlus as PlusIcon,
} from 'react-icons/fi';
import { IoMdClose as CloseIcon } from 'react-icons/io';
import { MdOutlineEdit as EditIcon, MdOutlineEditOff as EditOffIcon, MdMoreHoriz as MoreIcon } from 'react-icons/md';
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
  chevronRight: ChevronRightIcon,
  more: MoreIcon,
  read: ReadIcon,
  unread: UnreadIcon,
  menu: MenuIcon,
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
