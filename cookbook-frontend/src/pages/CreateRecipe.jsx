import { useState } from 'react';
import { inc, isEmpty } from 'ramda';

import TextField from '../components/TextField.jsx';
import UnitTable from '../components/UnitTable.jsx';
import StepTable from '../components/StepTable.jsx';
import { useMutation } from 'react-query';
import Axios from '../utils/Axios.js';
import { useNavigate } from 'react-router-dom';
import { Container, Typography } from '@mui/material';

const roundedButtonClasses =
  'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-3xl text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 uppercase';

export default function CreateRecipe() {
  const [recipeName, setRecipeName] = useState('');
  const [calories, setCalories] = useState(0);
  const [prepTime, setPrepTime] = useState(0);
  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientAmount, setIngredientAmount] = useState(0);
  const [ingredientUnit, setIngredientUnit] = useState('');
  const [nutritions, setNutritions] = useState([]);
  const [nutritionName, setNutritionName] = useState('');
  const [nutritionAmount, setNutritionAmount] = useState(0);
  const [nutritionUnit, setNutritionUnit] = useState('');
  const [steps, setSteps] = useState([]);
  const [stepContent, setStepContent] = useState('');
  const [file, setFile] = useState();

  const navigate = useNavigate();

  const { mutate } = useMutation(() => {
    const request = parseRequest();
    const form = new FormData();
    form.append('data', JSON.stringify(request));
    if (file) form.append('file', file, file.name);

    return Axios.post('recipes', form, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((res) => {
      if (res.status === 200) {
        navigate('/');
      }
    });
  });

  const parseRequest = () => {
    const request = {
      recipe: {
        name: recipeName,
        calories: calories,
        prep_time: prepTime,
        ingredients,
        nutritions,
        steps: steps.map((step, index) => ({
          ...step,
          step_number: inc(index),
        })),
      },
    };

    return request;
  };

  const handleRecipeNameChange = (e) => {
    setRecipeName(e.target.value);
  };

  const handleCaloriesChange = (e) => {
    setCalories(e.target.value);
  };

  const handlePrepTimeChange = (e) => {
    setPrepTime(e.target.value);
  };

  const handleIngredientNameChange = (e) => {
    setIngredientName(e.target.value);
  };

  const handleIngredientAmountChange = (e) => {
    setIngredientAmount(e.target.value);
  };

  const handleIngredientUnitChange = (e) => {
    setIngredientUnit(e.target.value);
  };

  const handleAddIngredient = (e) => {
    e.preventDefault();

    setIngredients([
      ...ingredients,
      { name: ingredientName, amount: ingredientAmount, unit: ingredientUnit },
    ]);

    setIngredientName('');
    setIngredientAmount(0);
    setIngredientUnit('');
  };

  const handleNutritionNameChange = (e) => {
    setNutritionName(e.target.value);
  };

  const handleNutritionAmountChange = (e) => {
    setNutritionAmount(e.target.value);
  };

  const handleNutritionUnitChange = (e) => {
    setNutritionUnit(e.target.value);
  };

  const handleAddNutrition = (e) => {
    e.preventDefault();

    setNutritions([
      ...nutritions,
      { name: nutritionName, amount: nutritionAmount, unit: nutritionUnit },
    ]);

    setNutritionName('');
    setIngredientAmount(0);
    setNutritionUnit('');
  };

  const handleStepContentChange = (e) => {
    setStepContent(e.target.value);
  };

  const handleAddStep = (e) => {
    e.preventDefault();

    setSteps([...steps, { content: stepContent }]);

    setStepContent('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    mutate();
  };

  const fileChangeHandler = (e) => setFile(e.target.files[0]);

  return (
    <Container>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Create Recipe
      </Typography>
      <div>
        {isEmpty(ingredients) ? null : (
          <>
            <h1>Ingredients</h1>
            <div className="relative overflow-x-auto">
              <UnitTable items={ingredients} setItems={setIngredients} />
            </div>
          </>
        )}
        {isEmpty(nutritions) ? null : (
          <>
            <h1>Nutrients</h1>
            <div className="relative overflow-x-auto">
              <UnitTable items={nutritions} setItems={setNutritions} />
            </div>
          </>
        )}
        {isEmpty(steps) ? null : (
          <>
            <h1>Steps</h1>
            <div className="relative overflow-x-auto">
              <StepTable setItems={setSteps} items={steps} />
            </div>
          </>
        )}
      </div>

      <div className="mb-2">
        <label
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="file_input"
        >
          Upload file
        </label>
        <input
          className="block w-full text-sm cursor-pointer mb-2"
          id="file_input"
          type="file"
          onChange={fileChangeHandler}
        />
      </div>
      <TextField
        handler={handleRecipeNameChange}
        id="recipe_name"
        label="recipe name"
        placeholder="Fruit Salad"
        required={true}
        type="text"
      />
      <TextField
        handler={handleCaloriesChange}
        id="calories"
        label="calories"
        placeholder={0}
        required={true}
        type="number"
      />
      <TextField
        handler={handlePrepTimeChange}
        id="prep_time"
        label="preparation time"
        placeholder={120}
        required={true}
        type="number"
      />
      <TextField
        handler={handleIngredientNameChange}
        id="ingredient_name"
        label="name"
        placeholder="Apple"
        required={true}
        type="text"
        value={ingredientName}
      />
      <TextField
        handler={handleIngredientAmountChange}
        id="amount"
        label="amount"
        placeholder={100}
        required={true}
        type="number"
        value={ingredientAmount}
      />
      <TextField
        handler={handleIngredientUnitChange}
        id="unit"
        label="unit"
        placeholder="grams"
        required={true}
        type="text"
        value={ingredientUnit}
      />
      <div>
        <button
          className={roundedButtonClasses}
          onClick={handleAddIngredient}
          type="button"
          style={{ backgroundColor: '#765A00', margin: '1em 0' }}
        >
          add ingredient
        </button>
      </div>
      <TextField
        id="step_content"
        type="text"
        label="content"
        handler={handleStepContentChange}
        placeholder="Dice the onions"
        required={true}
      />
      <div>
        <button
          className={roundedButtonClasses}
          onClick={handleAddStep}
          type="button"
          style={{ backgroundColor: '#765A00', margin: '1em 0' }}
        >
          add step
        </button>
      </div>
      <TextField
        handler={handleNutritionNameChange}
        id="nutrition_name"
        label="name"
        placeholder="Vitamin C"
        required={true}
        type="text"
        value={nutritionName}
      />
      <TextField
        handler={handleNutritionAmountChange}
        id="nutrition_amount"
        label="amount"
        placeholder={100}
        required={true}
        type="number"
        value={nutritionAmount}
      />
      <TextField
        handler={handleNutritionUnitChange}
        id="nutrition_unit"
        label="unit"
        placeholder="grams"
        required={true}
        type="text"
        value={nutritionUnit}
      />
      <div>
        <button
          className={roundedButtonClasses}
          onClick={handleAddNutrition}
          type="button"
          style={{ backgroundColor: '#765A00', margin: '1em 0' }}
        >
          add nutrition
        </button>
      </div>
      <div>
        <button
          className={roundedButtonClasses}
          onClick={handleSubmit}
          type="button"
          style={{ backgroundColor: '#765A00', margin: '1em 0' }}
        >
          create recipe
        </button>
      </div>
    </Container>
  );
}
