import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import GlobalContextProvider from './contexts/GlobalContextProvider.jsx';

import App from './App.jsx';
import Login from './pages/Login.jsx';

import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalContextProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </GlobalContextProvider>
  </React.StrictMode>,
);
