import { useState } from 'react';
import GlobalContext from './GlobalContext.js';
import { useQuery } from 'react-query';
import Axios from '../utils/Axios.js';

const GlobalContextProvider = ({ children }) => {
  const [profile, setProfile] = useState({});

  const globalState = {
    profile,
    setProfile,
  };

  useQuery('profile', async () => {
    return Axios.get('profile').then((data) => setProfile(data.data));
  });

  return (
    <GlobalContext.Provider value={globalState}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
