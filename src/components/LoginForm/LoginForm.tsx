import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import useNotification from '../../hooks/useNotification';

const LoginForm = () => {
  const { user, logIn } = useAuth();
  const [username, setUsername] = useState('admin@foobar.com');
  const [password, setPassword] = useState('letmein');
  const { notify } = useNotification();

  const onSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      await logIn({ username, password });
      notify({ message: 'Login successful' });
    } catch (error) {
      notify({ error });
    }
  };

  return (
    !user && (
      <form onSubmit={onSubmit}>
        <label htmlFor="email">Username</label>
        <input type="email" id="email" value={username} onChange={(e) => setUsername(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input type="submit" value="Submit" />
      </form>
    )
  );
};

export default LoginForm;
