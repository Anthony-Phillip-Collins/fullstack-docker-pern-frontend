import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle<{ $whiteColor?: boolean }>`
  html{
    font-size: 62.5%; /* 62.5% of 16px = 10px */
  }

  body {
    margin: 0;
    padding: 0;
    font-family: 'Open Sans', sans-serif;
    font-size: 1.6rem;
    line-height: 1.5;
    min-height: 100vh;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
    ${({
      theme: {
        global: { backgroundColor, color, fontSize, fontWeight, lineHeight },
      },
    }) => ({
      backgroundColor,
      color,
      fontSize,
      fontWeight,
      lineHeight,
    })}
  }

  a{
    cursor: pointer;
    font-weight: 500;
  }

  h1 {
    ${({ theme }) => ({ ...theme.fonts.h1 })};
  }

  h2 {
    ${({ theme }) => ({ ...theme.fonts.h2 })};
  }

  h3 {
    ${({ theme }) => ({ ...theme.fonts.h3 })};
  }

  h4 {
    ${({ theme }) => ({ ...theme.fonts.h4 })};
  }
`;
