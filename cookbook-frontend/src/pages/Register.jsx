import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import Axios from '../utils/Axios.js';
import { Container, Typography } from '@mui/material';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const navigate = useNavigate();

  const nameChangeHandler = (e) => setName(e.target.value);

  const emailChangeHandler = (e) => setEmail(e.target.value);

  const phoneChangeHandler = (e) => setPhone(e.target.value);

  const passwordChangeHandler = (e) => setPassword(e.target.value);

  const confirmPasswordChangeHandler = (e) =>
    setConfirmPassword(e.target.value);

  const { isLoading, mutate } = useMutation(() => {
    const formData = new FormData();

    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('password', password);

    Axios('register', {
      method: 'POST',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((res) => {
      if (res.status === 200) {
        navigate('/login');
      }
    });
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate();
  };

  return (
    <Container>
      <Typography variant="h5" sx={{ color: '#765A00', pb: 2 }}>
        Register
      </Typography>
      <form>
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 uppercase"
            >
              name
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John Doe"
              onChange={nameChangeHandler}
              required
            />
          </div>
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
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 uppercase"
            >
              phone
            </label>
            <input
              type="phone"
              id="phone"
              className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="johndoe@example.com"
              onChange={phoneChangeHandler}
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
            <label
              htmlFor="confirm_password"
              className="block mb-2 text-sm font-medium text-gray-900 uppercase"
            >
              confirm password
            </label>
            <input
              type="password"
              id="confirm_password"
              className="bg-gray-50 border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="················"
              onChange={confirmPasswordChangeHandler}
              required
            />
          </div>
          <div>
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 uppercase"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              register
            </button>
          </div>
        </div>
      </form>
    </Container>
  );
}
