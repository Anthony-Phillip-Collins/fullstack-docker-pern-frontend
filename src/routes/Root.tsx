import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav/Nav';
import NotificationContainer from '../components/Notification/NotificationContainer';
import useAuth from '../hooks/useAuth';
import useBlogs from '../hooks/useBlogs';
import useReadings from '../hooks/useReadings';
import useUsers from '../hooks/useUsers';
import Footer from '../components/Footer/Footer';
import Main from '../components/Main/Main';

const Root = () => {
  const { init: initAuth } = useAuth();
  const { init: initBlogs } = useBlogs();
  const { init: initUsers } = useUsers();
  const { init: initReadings } = useReadings();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  useEffect(() => {
    initBlogs();
  }, [initBlogs]);

  useEffect(() => {
    initUsers();
  }, [initUsers]);

  useEffect(() => {
    initReadings();
  }, [initReadings]);

  return (
    <>
      <Nav />
      <Main>
        <Outlet />
        <NotificationContainer />
      </Main>
      <Footer />
    </>
  );
};
export default Root;
