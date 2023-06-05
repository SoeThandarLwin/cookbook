import { useContext, useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import {
  AppBar,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';

import Axios from '../utils/Axios.js';
import { useNavigate } from 'react-router-dom';
import '../index.css';
import { AddCircle, ChevronLeft } from '@mui/icons-material';
import { primaryColor } from './Login.jsx';

export default function UpdateProfile() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [file, setFile] = useState();

  const navigate = useNavigate();

  useQuery(['profile'], () => {
    Axios.get('profile').then((res) => {
      setName(res.data.name);
      setPhone(res.data.phone);
    });
  });

  const { isLoading, mutate } = useMutation(() => {
    const form = new FormData();
    form.append('name', name);
    form.append('phone', phone);
    if (file) form.append('file', file, file.name);

    Axios.patch('profile', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(() => navigate('/profile'))
      .catch(console.error);
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate();
  };

  const nameChangeHandler = (e) => setName(e.target.value);

  const phoneChangeHandler = (e) => setPhone(e.target.value);

  const fileChangeHandler = (e) => setFile(e.target.files[0]);

  return (
    <>
      <AppBar
        style={{ backgroundColor: '#fff' }}
        position="static"
        sx={{ position: 'fixed', top: 0, left: 0, right: 0 }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate(-1)}
          >
            <ChevronLeft />
          </IconButton>
          <Typography
            variant="h5"
            color="#765A00"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Update Profile
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 10 }}>
        <form>
          <div className="mb-2">
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
              value={name}
              onChange={nameChangeHandler}
              required
            />
          </div>
          <div className="mb-2">
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
              value={phone}
              onChange={phoneChangeHandler}
              required
            />
          </div>
          <div className="mb-2">
            <label
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              htmlFor="file_input"
            >
              Upload file
            </label>
            <input
              className="block w-full text-sm cursor-pointer mb-2"
              id="file_input"
              type="file"
              onChange={fileChangeHandler}
            />
          </div>
          <div className="mt-4">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-3xl text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 uppercase"
              style={{ backgroundColor: primaryColor }}
              onClick={handleSubmit}
              disabled={isLoading}
            >
              update
            </button>
          </div>
        </form>
      </Container>
    </>
  );
}
