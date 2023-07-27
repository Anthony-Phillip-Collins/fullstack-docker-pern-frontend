import { Link, Outlet } from 'react-router-dom';
import LoginForm from '../components/LoginForm/LoginForm';

const Root = () => {
  return (
    <>
      <LoginForm />
      <nav>
        <ul>
          <li>
            <Link to={`/`}>Home</Link>
          </li>
          <li>
            <Link to={`/blogs`}>Blogs</Link>
          </li>
          <li>
            <Link to={`/users`}>Blogs</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Root;
