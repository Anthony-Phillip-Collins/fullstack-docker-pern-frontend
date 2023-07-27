import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import store from './app/store.ts';
import Root from './routes/Root.tsx';
import BlogsPage from './routes/BlogsPage.tsx';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/global.tsx';
import theme from './styles/theme.tsx';
import ErrorPage from './routes/ErrorPage.tsx';
import UsersPage from './routes/UsersPage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <h1>Home</h1>,
      },
      {
        path: '/blogs',
        element: <BlogsPage />,
      },
      {
        path: '/users',
        element: <UsersPage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
