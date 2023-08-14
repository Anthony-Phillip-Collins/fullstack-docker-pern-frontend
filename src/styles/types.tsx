interface Spacing {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xxl: string;
}

interface Breakpoints {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export type ColorVariants = 'primary' | 'secondary' | 'danger';

interface Colors {
  primary: string;
  primaryVariant: string;
  textOnPrimary: string;
  secondary: string;
  secondaryVariant: string;
  textOnSecondary: string;
  danger: string;
  dangerVariant: string;
  textOnDanger: string;
  success: string;
  textOnSuccess: string;
  light: string;
  dark: string;
  darkVariant: string;
  grey: string;
  greyVariant: string;
  disabled: string;
  textOnDisabled: string;
}

export enum FontWeight {
  light = 300,
  regular = 400,
  medium = 500,
  bold = 700,
}

interface FontProps {
  fontSize: string;
  fontWeight: FontWeight;
  lineHeight: string;
}

interface Fonts {
  h1: FontProps;
  h2: FontProps;
  h3: FontProps;
  h4: FontProps;
  body: FontProps;
  detail: FontProps;
}

interface Icons {
  size: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

interface Transitions {
  duration: string;
  timingFunction: string;
}

interface Global extends FontProps {
  backgroundColor: string;
  color: string;
  borderRadius: string;
  fontFamily: string;
}

interface Page {
  maxWidth: string;
}

interface ThemeProps {
  color: string;
  backgroundColor: string;
}

export interface Theme {
  primary: ThemeProps;
  secondary: ThemeProps;
  spacing: Spacing;
  breakpoints: Breakpoints;
  colors: Colors;
  fonts: Fonts;
  icons: Icons;
  transitions: Transitions;
  page: Page;
  global: Global;
}
