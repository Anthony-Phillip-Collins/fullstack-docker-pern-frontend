import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Main from '../components/Main/Main';
import Nav from '../components/Nav/Nav';
import NotificationContainer from '../components/Notification/NotificationContainer';
import useAuth from '../hooks/useAuth';
import useBlogs from '../hooks/useBlogs';
import useLikings from '../hooks/useLikings';
import useReadings from '../hooks/useReadings';
import useUsers from '../hooks/useUsers';

const Root = () => {
  const { init: initAuth } = useAuth();
  const { init: initBlogs } = useBlogs();
  const { init: initUsers } = useUsers();
  const { init: initReadings } = useReadings();
  const { init: initLikes } = useLikings();

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

  useEffect(() => {
    initLikes();
  }, [initLikes]);

  return (
    <>
      <header>
        <Nav />
      </header>
      <Main>
        <Outlet />
        <NotificationContainer />
      </Main>
      <Footer />
    </>
  );
};
export default Root;
