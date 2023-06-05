import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import GlobalContextProvider from './contexts/GlobalContextProvider.jsx';

import App from './App.jsx';
import Login from './pages/Login.jsx';

import Register from './pages/Register.jsx';
import Recipes from './pages/Recipes.jsx';
import CreateRecipe from './pages/CreateRecipe.jsx';
import Profile from './pages/Profile.jsx';
import UpdateProfile from './pages/UpdateProfile.jsx';
import Recipe from './pages/Recipe.jsx';
import Layout from './components/Layout.jsx';
import Search from './pages/Search.jsx';
import MyRecipes from './pages/MyRecipes.jsx';
import Settings from './pages/Settings.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <App /> },
      {
        path: '/recipes',
        element: <Recipes />,
      },
      {
        path: '/search',
        element: <Search />,
      },
      {
        path: '/profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: 'profile/recipes',
        element: (
          <ProtectedRoute>
            <MyRecipes />
          </ProtectedRoute>
        ),
      },
      {
        path: '/settings',
        element: <Settings />,
      },
    ],
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
    path: '/create',
    element: (
      <ProtectedRoute>
        <CreateRecipe />
      </ProtectedRoute>
    ),
  },
  {
    path: '/profile/update',
    element: (
      <ProtectedRoute>
        <UpdateProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: '/recipes/:id',
    element: <Recipe />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <GlobalContextProvider>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </GlobalContextProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
