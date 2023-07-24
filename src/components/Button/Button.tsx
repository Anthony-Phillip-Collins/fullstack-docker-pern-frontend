import { styled } from 'styled-components';
import { ColorVariants, FontWeight } from '../../styles/types';
import mixins from '../../styles/mixins';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ColorVariants;
}

const Button = styled.button.withConfig({
  shouldForwardProp: (prop) => !['variant'].includes(prop),
})<Props>`
  ${(props) => {
    const { theme } = props;
    const variant: ColorVariants = props.variant || 'primary';
    const variantTitleCase = variant.substring(0, 1).toUpperCase() + variant.substring(1);
    const textOnVariant =
      `textOn${variantTitleCase}` as keyof typeof theme.colors; /* textOnPrimary or textOnSecondary */

    return {
      border: 'none',
      cursor: 'pointer',
      display: 'inline-block',
      ...theme.fonts.body,
      fontWeight: FontWeight.medium,
      backgroundColor: theme.colors[variant],
      color: theme.colors[textOnVariant],
      borderRadius: theme.global.borderRadius,
      padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
      textDecoration: 'none',
      ...mixins.transition('background-color'),
      '&:hover': {
        backgroundColor: theme.colors[`${variant}Variant`],
      },
    };
  }};
`;

export default Button;
