import { createBrowserRouter } from 'react-router-dom';
import Root from './Root';
import BlogPage from './blogs/Blog.page';
import BlogsPage from './blogs/Blogs.page';
import BookmarksPage from './bookmarks/Bookmarks.page';
import ErrorPage from './errors/Error.page';
import UserPage from './users/User.page';
import UsersPage from './users/Users.page';
import HomePage from './home/Home.page';
import NotFoundPage from './errors/NotFound.page';

const routerPaths = {
  home: '/',
  blogs: '/blogs',
  blog: '/blogs/:id',
  users: '/users',
  user: '/users/:id',
  bookmarks: '/bookmarks',
};

export const routerUtils = {
  getHomePath: () => routerPaths.home,
  getBlogsPath: () => routerPaths.blogs,
  getBlogPath: (id: number) => routerPaths.blog.replace(':id', `${id}`),
  getUsersPath: () => routerPaths.users,
  getUserPath: (id: number) => routerPaths.user.replace(':id', `${id}`),
  getBookmarksPath: () => routerPaths.bookmarks,
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: routerPaths.home,
        element: <HomePage />,
      },
      {
        path: routerPaths.blogs,
        element: <BlogsPage />,
      },
      {
        path: routerPaths.blog,
        element: <BlogPage />,
      },
      {
        path: routerPaths.users,
        element: <UsersPage />,
      },
      {
        path: routerPaths.user,
        element: <UserPage />,
      },
      {
        path: routerPaths.bookmarks,
        element: <BookmarksPage />,
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export default router;
