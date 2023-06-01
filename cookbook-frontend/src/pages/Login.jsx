import { useContext, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import Axios from '../utils/Axios.js';
import GlobalContext from '../contexts/GlobalContext.js';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const { setProfile } = useContext(GlobalContext);

  const emailChangeHandler = (e) => setEmail(e.target.value);

  const passwordChangeHandler = (e) => setPassword(e.target.value);

  const { isLoading, mutate } = useMutation(() => {
    return Axios.post('login', {
      email,
      password,
    }).then((res) => {
      if (res.status === 200) {
        setProfile(res.data);
        navigate('/');
      }
    });
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate();
  };

  return (
    <>
      <form>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 uppercase"
            >
              email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="johndoe@example.com"
              onChange={emailChangeHandler}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 uppercase"
            >
              password
            </label>
            <input
              type="password"
              id="password"
              className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="················"
              onChange={passwordChangeHandler}
              required
            />
          </div>
          <div>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
