import {
  AppBar,
  Avatar,
  Container,
  Grid,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { useContext, useState } from 'react';
import { useQuery } from 'react-query';

import GlobalContext from './contexts/GlobalContext.js';

import Axios from './utils/Axios.js';
import { RecipeCard } from './pages/Recipes.jsx';
import { ChevronLeft } from '@mui/icons-material';

function App() {
  const { profile } = useContext(GlobalContext);

  const [featured, setFeatured] = useState([]);
  const [popular, setPopular] = useState([]);

  const { isLoadingFeatured } = useQuery('featured', async () => {
    Axios.get('featured').then((data) => setFeatured(data.data));
  });

  const { isLoadingPopular } = useQuery('popular', async () => {
    Axios.get('popular').then((data) => setPopular(data.data));
  });

  const getAvatar = () => {
    return `http://localhost:3000/images/${
      profile.avatar ? profile.avatar : 'avatar.png'
    }`;
  };

  return (
    <>
      <Container>
        <div style={{ margin: '1rem 0' }}>
          <Grid container>
            <Grid item xs={10}>
              <Typography variant="h4" sx={{ color: '#765A00' }}>
                Welcome
              </Typography>
              <Typography variant="h6" sx={{ color: '#765A00', pb: 2 }}>
                {profile.name ? profile.name : 'Guest'}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Avatar
                src={getAvatar()}
                sx={{
                  width: 64,
                  height: 64,
                  border: '1px solid',
                  margin: '0 auto',
                  mb: 2.5,
                }}
              />
            </Grid>
          </Grid>
        </div>
        <Typography variant="h5" sx={{ color: '#765A00', pb: 2 }}>
          Featured
        </Typography>
        {!isLoadingFeatured &&
          featured.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        <Typography variant="h5" sx={{ color: '#765A00', pb: 2 }}>
          Popular
        </Typography>
        {!isLoadingFeatured &&
          featured.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
      </Container>
    </>
  );
}

export default App;
