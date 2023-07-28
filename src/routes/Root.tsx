import { Outlet } from 'react-router-dom';
import LoginForm from '../components/LoginForm/LoginForm';
import Nav from '../components/Nav/Nav';

const Root = () => {
  return (
    <>
      <LoginForm />
      <Nav />
      <Outlet />
    </>
  );
};
export default Root;
