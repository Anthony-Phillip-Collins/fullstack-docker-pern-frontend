import { FontWeight, Theme } from './types';

const spacing: Theme['spacing'] = {
  sm: '0.25rem',
  md: '0.5rem',
  lg: '1.0rem',
  xl: '1.5rem',
  xxl: '3.0rem',
};

const colorsShared = {
  light: '#eceff1',
  dark: '#263238',
  darkVariant: '#171e21',
  grey: '#455a64',
  greyVariant: '#607d8b',
};

const colors: Theme['colors'] = {
  primary: '#01579b',
  primaryVariant: '#0288d1',
  textOnPrimary: colorsShared.light,
  secondary: '#1b5e20',
  secondaryVariant: '#2e7d32',
  textOnSecondary: colorsShared.light,
  danger: '#b71c1c',
  dangerVariant: '#ff9999',
  textOnDanger: colorsShared.light,
  success: '#2e7d32',
  textOnSuccess: colorsShared.light,
  disabled: colorsShared.grey,
  textOnDisabled: colorsShared.light,
  ...colorsShared,
};

const breakpoints: Theme['breakpoints'] = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

const fonts: Theme['fonts'] = {
  h1: {
    fontSize: '4.2rem',
    fontWeight: FontWeight.bold,
    lineHeight: '4.6rem',
  },

  h2: {
    fontSize: '2.8rem',
    fontWeight: FontWeight.bold,
    lineHeight: '3.5rem',
  },

  h3: {
    fontSize: '2.2rem',
    fontWeight: FontWeight.medium,
    lineHeight: '3.0rem',
  },

  h4: {
    fontSize: '2.0rem',
    fontWeight: FontWeight.medium,
    lineHeight: '2.5rem',
  },

  body: {
    fontSize: '1.6rem',
    fontWeight: FontWeight.regular,
    lineHeight: '2.5rem',
  },

  detail: {
    fontSize: '1.2rem',
    fontWeight: FontWeight.light,
    lineHeight: '2.0rem',
  },
};

const icons: Theme['icons'] = {
  size: {
    sm: '1.6rem',
    md: '2.0rem',
    lg: '2.4rem',
    xl: '3.0rem',
  },
};

const transitions: Theme['transitions'] = {
  duration: '0.2s',
  timingFunction: 'ease-out',
};

const page: Theme['page'] = {
  maxWidth: '1200px',
};

const global: Theme['global'] = {
  borderRadius: '0.4rem',
  backgroundColor: colors.dark,
  color: colors.light,
  ...fonts.body,
  fontFamily: "'Open Sans', sans-serif",
};

const theme: Theme = {
  primary: {
    color: colors.dark,
    backgroundColor: colors.primary,
  },
  secondary: {
    color: colors.dark,
    backgroundColor: colors.secondary,
  },
  spacing,
  breakpoints,
  colors,
  fonts,
  icons,
  transitions,
  page,
  global,
};

export default theme;
