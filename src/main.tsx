import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import store from './app/store.ts';
import router from './routes/index.tsx';
import { GlobalStyle } from './styles/global.tsx';
import theme from './styles/theme.tsx';
import { WindowContextProvider } from './context/WindowContext.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <WindowContextProvider>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <RouterProvider router={router} />
        </ThemeProvider>
      </WindowContextProvider>
    </Provider>
  </React.StrictMode>,
);
