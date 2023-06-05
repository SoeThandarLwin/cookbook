import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import { AddCircle, ChevronLeft } from '@mui/icons-material';
import { RecipeCard } from './Recipes.jsx';
import { useState } from 'react';
import { useQuery } from 'react-query';
import Axios from '../utils/Axios.js';
import { useNavigate } from 'react-router-dom';
import { primaryColor } from './Login.jsx';

const roundedButtonClasses =
  'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-3xl text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 uppercase';

export default function MyRecipes() {
  const [recipes, setRecipes] = useState([]);
  const { data, isFetching } = useQuery('myRecipes', () => {
    return Axios.get('my_recipes').then((res) => setRecipes(res.data));
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate('/create');
  };

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
            My Recipes
          </Typography>
          <div>
            <IconButton
              size="large"
              onClick={handleSubmit}
              color={primaryColor}
            >
              <AddCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 10, mb: 10 }}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </Container>
    </>
  );
}
