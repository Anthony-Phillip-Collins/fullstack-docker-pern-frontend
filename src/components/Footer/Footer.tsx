import ACLogo from '../ACLogo/ACLogo';
import ExternalLink from '../Link/ExternalLink';
import FooterStyled from './Footer.styled';

const Footer = () => {
  return (
    <footer>
      <FooterStyled>
        Developed by <ACLogo style={{ width: '3rem', height: '3rem', margin: '1rem' }} />
        <ExternalLink href="https:anthonycollins.net">Anthony Collins</ExternalLink>
      </FooterStyled>
    </footer>
  );
};

export default Footer;
