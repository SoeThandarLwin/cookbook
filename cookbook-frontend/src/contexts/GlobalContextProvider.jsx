import { useState } from 'react';
import GlobalContext from './GlobalContext.js';

const GlobalContextProvider = (props) => {
  const [profile, setProfile] = useState({});

  const globalState = {
    profile,
    setProfile,
  };

  return (
    <GlobalContext.Provider value={globalState}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
