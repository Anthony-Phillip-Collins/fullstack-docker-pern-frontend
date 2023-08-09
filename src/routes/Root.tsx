import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav/Nav';
import NotificationContainer from '../components/Notification/NotificationContainer';
import useAuth from '../hooks/useAuth';
import useBlogs from '../hooks/useBlogs';
import useReadings from '../hooks/useReadings';
import useUsers from '../hooks/useUsers';

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
      <Outlet />
      <NotificationContainer />
    </>
  );
};
export default Root;
