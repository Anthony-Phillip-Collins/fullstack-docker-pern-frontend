import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle<{ $whiteColor?: boolean }>`
  html{
    font-size: 62.5%; /* 62.5% of 16px = 10px */
  }

  [role=tooltip] {
    ${() => {
      const display = window.navigator.maxTouchPoints > 0 ? 'none' : 'block';
      return {
        display,
      };
    }}
  }

  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
    ${({ theme: { global } }) => ({
      ...global,
    })}
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
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
