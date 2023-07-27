import { StyledTextLink } from './TextLink.styled';

export interface TextLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  truncate?: boolean;
}

const TextLink = (props: TextLinkProps) => <StyledTextLink {...props} />;

export default TextLink;
