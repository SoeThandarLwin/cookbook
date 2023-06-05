import { useContext } from 'react';
import GlobalContext from '../contexts/GlobalContext.js';
import { isEmpty } from 'ramda';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { profile } = useContext(GlobalContext);

  if (isEmpty(profile)) {
    return <Navigate to="/login" />;
  }

  return children;
}
