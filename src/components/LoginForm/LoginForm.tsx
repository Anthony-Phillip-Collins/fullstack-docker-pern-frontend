import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useNotification from '../../hooks/useNotification';
import Button from '../Button/Button';

const LoginForm = () => {
  const { user, logIn, logOut } = useAuth();
  const [username, setUsername] = useState('admin@foobar.com');
  const [password, setPassword] = useState('letmein');
  const { notifyAsync } = useNotification();

  const onLogIn: React.FormEventHandler = async (e) => {
    e.preventDefault();
    notifyAsync(logIn({ username, password }), 'Logged in.');
  };

  const onLogOut: React.MouseEventHandler = async (e) => {
    e.preventDefault();
    notifyAsync(logOut(), 'Logged out.');
  };

  return user ? (
    <>
      <Button onClick={onLogOut}>Log Out</Button>
    </>
  ) : (
    <form onSubmit={onLogIn}>
      <label htmlFor="email">Username</label>
      <input type="email" id="email" value={username} onChange={(e) => setUsername(e.target.value)} />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default LoginForm;
