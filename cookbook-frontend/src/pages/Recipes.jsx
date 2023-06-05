import { useQuery } from 'react-query';
import { useState } from 'react';
import Axios from '../utils/Axios.js';
import {
  Box,
  Card,
  Container,
  CardActions,
  Toolbar,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
  AppBar,
} from '@mui/material';
import { ChevronLeft, Favorite } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export function RecipeCard({ recipe }) {
  const navigate = useNavigate();

  const handleNavigate = (e, id) => {
    if (!!e.target.nearestViewportElement) {
      if (e.target.nearestViewportElement.dataset.testid === 'FavoriteIcon') {
      }
    } else {
      navigate(`/recipes/${id}`);
    }
  };

  return (
    <Card
      sx={{ display: 'flex', mb: 1 }}
      style={{ backgroundColor: '#ECE1DF' }}
      onClick={(e) => handleNavigate(e, recipe.id)}
    >
      <CardMedia
        component="img"
        sx={{ width: 125 }}
        image={
          recipe.image
            ? `http://localhost:3000/images/${recipe.image}`
            : 'http://localhost:3000/images/unknown.png'
        }
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5" color="#765a00">
            {recipe.name}
          </Typography>
          <Typography variant="subtitle1" color="#765a00" component="div">
            {recipe.calories} cal
          </Typography>
          <Typography variant="subtitle1" color="#765a00" component="div">
            {recipe.prep_time} mins
          </Typography>
        </CardContent>
      </Box>
      <CardActions sx={{ flex: '1 0 auto', justifyContent: 'flex-end' }}>
        <IconButton>
          <Favorite sx={{}} />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const { data, isFetching } = useQuery('fetchRecipes', () => {
    return Axios.get('recipes').then((res) => setRecipes(res.data.data));
  });

  const navigate = useNavigate();

  return (
    <>
      <Container sx={{ mt: 2, pb: 8 }}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </Container>
    </>
  );
}
