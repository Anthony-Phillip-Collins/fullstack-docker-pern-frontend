import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import blogThunk from '../app/features/blog.slice';
import userThunk from '../app/features/user.slice';
import { useAppDispatch } from '../app/hooks';
import LoginForm from '../components/LoginForm/LoginForm';
import Nav from '../components/Nav/Nav';
import useAuth from '../hooks/useAuth';
import readingThunk from '../app/features/reading.slice';

const Root = () => {
  const { init } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    init();
    dispatch(userThunk.fetchAll());
    dispatch(blogThunk.fetchAll());
    dispatch(readingThunk.fetchAll());
  }, [init, dispatch]);

  return (
    <>
      <LoginForm />
      <Nav />
      <Outlet />
    </>
  );
};
export default Root;
