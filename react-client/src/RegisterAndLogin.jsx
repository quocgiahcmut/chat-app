import axios from 'axios';
import { useContext, useState } from 'react';

import { UserContext } from './UserContext.jsx';

function RegisterAndLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginOrRegister, setIsLoginOrRegister] = useState('login');
  const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);
  async function handleSubmit(ev) {
    const endpoint = isLoginOrRegister === 'register' ? '/register' : '/login';
    ev.preventDefault();
    const { data } = await axios.post(endpoint, { username, password });
    setLoggedInUsername(username);
    setId(data.id);
  }

  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form onSubmit={handleSubmit} className="w-64 mx-auto mb-12">
        <input
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
          className="block w-full rounded-sm p-2 mb-2 border"
          type="text"
          placeholder="username"
        />
        <input
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          className="block w-full rounded-sm p-2 mb-2 border"
          type="password"
          placeholder="password"
        />
        <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
          {isLoginOrRegister === 'register' ? 'Register' : 'Login'}
        </button>
        <div className="text-center mt-2">
          {isLoginOrRegister === 'register' && (
            <div>
              Already a member?
              <button
                onClick={() => setIsLoginOrRegister('login')}
                className="ml-1"
              >
                Login here
              </button>
            </div>
          )}
          {isLoginOrRegister === 'login' && (
            <div>
              Dont have an account?
              <button
                onClick={() => setIsLoginOrRegister('register')}
                className="ml-1"
              >
                Register
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default RegisterAndLogin;
