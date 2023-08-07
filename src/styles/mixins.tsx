import theme from './theme';
import type * as CSS from 'csstype';

const { xs, sm, md, lg, xl, xxl } = theme.breakpoints;

const media = {
  xs: (styles: CSS.Properties) => ({
    [`@media only screen and (min-width: ${xs}px)`]: {
      ...styles,
    },
  }),
  sm: (styles: CSS.Properties) => ({
    [`@media only screen and (min-width: ${sm}px)`]: {
      ...styles,
    },
  }),
  md: (styles: CSS.Properties) => ({
    [`@media only screen and (min-width: ${md}px)`]: {
      ...styles,
    },
  }),
  lg: (styles: CSS.Properties) => ({
    [`@media only screen and (min-width: ${lg}px)`]: {
      ...styles,
    },
  }),
  xl: (styles: CSS.Properties) => ({
    [`@media only screen and (min-width: ${xl}px)`]: {
      ...styles,
    },
  }),
  xxl: (styles: CSS.Properties) => ({
    [`@media only screen and (min-width: ${xxl}px)`]: {
      ...styles,
    },
  }),
};

const mediaCss = {
  xs: (styles: TemplateStringsArray) => `
      @media only screen and (min-width: ${xs}px) {
        ${styles}
      }
    `,
  sm: (styles: TemplateStringsArray) => `
      
      @media only screen and (min-width: ${sm}px) {
        ${styles}
      }
    `,
  md: (styles: TemplateStringsArray) => `
      @media only screen and (min-width: ${md}px) {
        ${styles}
      }
    `,
  lg: (styles: TemplateStringsArray) => `
      @media only screen and (min-width: ${lg}px) {
        ${styles}
      }
    `,
  xl: (styles: TemplateStringsArray) => `
      @media only screen and (min-width: ${xl}px) {
        ${styles}
      }
    `,
  xxl: (styles: TemplateStringsArray) => `
      @media only screen and (min-width: ${xxl}px) {
        ${styles}
      }
    `,
};

const transition = (...properties: string[]) => ({
  transitionDuration: theme.transitions.duration,
  transitionTimingFunction: theme.transitions.timingFunction,
  transitionProperty: properties.join(','),
});

const mixins = {
  media,
  mediaCss,
  transition,
};

export default mixins;
