import { useState } from 'react';
import authService from '../../services/auth.service';

const LoginForm = () => {
  const [username, setUsername] = useState('admin@foobar.com');
  const [password, setPassword] = useState('letmein');

  const onSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await authService.login({ username, password });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="email">Username</label>
      <input type="email" id="email" value={username} onChange={(e) => setUsername(e.target.value)} />
      <label htmlFor="password">Password</label>
      <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="submit" value="Submit" />
    </form>
  );
};

export default LoginForm;
