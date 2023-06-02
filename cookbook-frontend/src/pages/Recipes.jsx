import { useQuery } from 'react-query';
import { useState } from 'react';
import Axios from '../utils/Axios.js';

function RecipeCard({ recipe }) {
  return (
    <div className="max-w-md w-full lg:flex">
      <div
        className="h-20 w-20 flex-none bg-cover rounded-t text-center overflow-hidden"
        style={{
          backgroundImage: "url('https://tailwindcss.com/img/card-left.jpg')",
        }}
      ></div>
      <div className="border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="text-black font-bold text-xl mb-2">{recipe.name}</div>
          <p className="text-grey-darker text-base">
            <ul>
              <li>{recipe.calories}</li>
              <li>{recipe.prep_time}</li>
            </ul>
          </p>
        </div>
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full mr-4"
            src={
              recipe.user.avatar
                ? `http://localhost:3000/images/${recipe.user.avatar}`
                : 'http://localhost:3000/images/avatar.png'
            }
            alt="Avatar of Jonathan Reinink"
          />
          <div className="text-sm">
            <p className="text-black leading-none">{recipe.user.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const { data, isFetching } = useQuery('fetchRecipes', () => {
    return Axios.get('recipes').then((res) => setRecipes(res.data.data));
  });

  return (
    <>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </>
  );
}
