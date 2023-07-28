import { StyledExternalLink } from './ExternalLink.styled';

export interface ExternalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  truncate?: boolean;
}

const ExternalLink = (props: ExternalLinkProps) => <StyledExternalLink {...props} target="_blank" />;

export default ExternalLink;
