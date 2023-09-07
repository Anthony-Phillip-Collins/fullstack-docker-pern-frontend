import { styled } from 'styled-components';
import Container from '../Container/Container';

const FooterStyled = styled(Container)`
  ${({ theme }) => ({
    marginTop: theme.spacing.xxl,
    backgroundColor: theme.colors.darkVariant,
  })}

  &>:first-child {
    display: flex;
    align-items: center;
    justify-content: center;
    ${({ theme }) => ({
      paddingTop: theme.spacing.xxl,
      paddingBottom: theme.spacing.xxl,
    })}
  }
`;

export default FooterStyled;
