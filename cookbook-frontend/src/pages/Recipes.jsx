import { useQuery } from 'react-query';
import { useState } from 'react';
import Axios from '../utils/Axios.js';

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const { data, isFetching } = useQuery('fetchRecipes', () => {
    return Axios.get('recipes').then((res) => setRecipes(res.data.data));
  });

  return (
    <>
      {recipes.map((recipe) => (
        <div key={recipe.id}>{recipe.name}</div>
      ))}
    </>
  );
}
