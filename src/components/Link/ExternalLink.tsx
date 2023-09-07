import { ExternalLinkStyled } from './ExternalLink.styled';

export interface ExternalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  truncate?: boolean;
}

const ExternalLink = (props: ExternalLinkProps) => <ExternalLinkStyled {...props} target="_blank" rel="noreferrer" />;

export default ExternalLink;
