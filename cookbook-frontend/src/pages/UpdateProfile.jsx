import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';

import Axios from '../utils/Axios.js';
import { useNavigate } from 'react-router-dom';

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

    console.log(e);

    mutate();
  };

  const nameChangeHandler = (e) => setName(e.target.value);

  const phoneChangeHandler = (e) => setPhone(e.target.value);

  const fileChangeHandler = (e) => setFile(e.target.files[0]);

  return (
    <>
      <form>
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
            value={name}
            onChange={nameChangeHandler}
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
            value={phone}
            onChange={phoneChangeHandler}
            required
          />
        </div>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="file_input"
          >
            Upload file
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            onChange={fileChangeHandler}
          />
        </div>
        <div>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 uppercase"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            update
          </button>
        </div>
      </form>
    </>
  );
}
