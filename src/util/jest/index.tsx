import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';
import { WindowContextProvider } from '../../context/WindowContext';
import { GlobalStyle } from '../../styles/global';
import store from '../../app/store';

export const renderWithProviders = (component: JSX.Element) =>
  render(
    <Provider store={store}>
      <WindowContextProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          {component}
        </ThemeProvider>
      </WindowContextProvider>
    </Provider>,
  );
