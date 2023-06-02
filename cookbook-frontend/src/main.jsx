import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import GlobalContextProvider from './contexts/GlobalContextProvider.jsx';

import App from './App.jsx';
import Login from './pages/Login.jsx';

import './index.css';
import Register from './pages/Register.jsx';
import Recipes from './pages/Recipes.jsx';
import CreateRecipe from './pages/CreateRecipe.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/recipes',
    element: <Recipes />,
  },
  {
    path: '/create',
    element: <CreateRecipe />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </QueryClientProvider>
    </GlobalContextProvider>
  </React.StrictMode>,
);
