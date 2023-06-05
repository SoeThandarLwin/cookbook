import { useContext, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import Axios from '../utils/Axios.js';
import GlobalContext from '../contexts/GlobalContext.js';
import { Container, Typography } from '@mui/material';

import logo from '../assets/logo.png';

export const primaryColor = '#765A00';

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

  const handleRegister = (e) => {
    e.preventDefault();

    navigate('/register');
  };

  return (
    <div
      style={{
        height: '100vh',
        backgroundImage: `url('http://localhost:3000/images/breakfast.jpeg')`,
        backgroundSize: 'cover',
      }}
    >
      <form
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <img
            src={logo}
            style={{
              width: 200,
              margin: '2em auto',
              backgroundColor: 'rgba(255, 255, 255, 0.75)',
            }}
          />
        </div>
        <div
          style={{
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
            borderRadius: '1em',
            padding: '1em',
            width: '75%',
          }}
        >
          <Typography
            variant="h4"
            style={{ textAlign: 'center', color: primaryColor }}
          >
            Login
          </Typography>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 uppercase"
                style={{ color: primaryColor }}
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
                style={{ color: primaryColor }}
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
          </div>
        </div>
        <div style={{ width: '75%', margin: '2em 0' }}>
          <div style={{ width: '100%', marginBottom: '1em' }}>
            <button
              type="button"
              className="text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-3xl text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none bg-fuchsia-100 bg-opacity-90 text-fuchsia-800"
              onClick={handleRegister}
              style={{
                width: '100%',
                border: `1px solid ${primaryColor}`,
              }}
            >
              Register
            </button>
          </div>
          <div style={{ width: '100%' }}>
            <button
              type="button"
              className="text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-3xl text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={handleSubmit}
              disabled={isLoading}
              style={{
                width: '100%',
                backgroundColor: primaryColor,
              }}
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
