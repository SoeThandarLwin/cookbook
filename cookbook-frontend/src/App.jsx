import { useContext } from 'react';
import GlobalContext from './contexts/GlobalContext.js';

function App() {
  const { profile } = useContext(GlobalContext);

  return <>{JSON.stringify(profile, null, 2)}</>;
}

export default App;
