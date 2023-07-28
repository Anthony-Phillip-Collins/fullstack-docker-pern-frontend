import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { linkStyles } from './InternalLink.styled';

const InternalLink = styled(Link)`
  ${linkStyles}
`;

export default InternalLink;
