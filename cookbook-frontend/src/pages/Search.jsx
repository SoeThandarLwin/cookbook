import { Container, IconButton, InputBase, Paper } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useState } from 'react';
import { useQuery } from 'react-query';
import Axios from '../utils/Axios.js';
import { RecipeCard } from './Recipes.jsx';

export default function Search() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const { refetch } = useQuery(
    ['search', query],
    async () => {
      return Axios.get(`search?query=${query}`).then((data) =>
        setRecipes(data.data),
      );
    },
    {
      enabled: false,
    },
  );

  const handleSearch = (e) => {
    e.preventDefault();

    refetch();
  };

  return (
    <Container>
      <Paper
        component="form"
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          marginTop: 2,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Cookbook"
          onChange={handleSearchChange}
        />
        <IconButton type="button" sx={{ p: '10px' }} onClick={handleSearch}>
          <SearchIcon />
        </IconButton>
      </Paper>
      <div style={{ marginTop: 10, marginBottom: 10 }}>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </Container>
  );
}
