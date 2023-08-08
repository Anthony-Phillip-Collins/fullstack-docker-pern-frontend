import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import store from './app/store.ts';
import Root from './routes/Root.tsx';
import { ThemeProvider } from 'styled-components';
import BlogsPage from './routes/blogs/Blogs.page.tsx';
import ErrorPage from './routes/Error.page.tsx';
import UsersPage from './routes/users/Users.page.tsx';
import { GlobalStyle } from './styles/global.tsx';
import theme from './styles/theme.tsx';
import BlogPage from './routes/blogs/Blog.page.tsx';
import UserPage from './routes/users/User.page.tsx';
import BookmarksPage from './routes/bookmarks/Bookmarks.page.tsx';

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
        path: '/blogs/:id',
        element: <BlogPage />,
      },
      {
        path: '/users',
        element: <UsersPage />,
      },
      {
        path: '/users/:id',
        element: <UserPage />,
      },
      {
        path: '/bookmarks',
        element: <BookmarksPage />,
      },
      { path: '*', element: <h1>Not Found</h1> },
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
