import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import createRecipeHandler from './handlers/createRecipeHandler.js';
import getRecipeHandler from "./handlers/getRecipeHandler.js";
import listRecipesHandler from './handlers/listRecipesHandler.js';
import loginHandler from './handlers/loginHandler.js';
import registerHandler from './handlers/registerHandler.js';
import rootHandler from './handlers/rootHandler.js';
import getProfileHandler from "./handlers/getProfileHandler.js";
import updateProfileHandler from "./handlers/updateProfileHandler.js";
import getFeaturedHandler from "./handlers/getFeaturedHandler.js";
import getPopularHandler from "./handlers/getPopularHandler.js";
import deleteProfileHandler from "./handlers/deleteProfileHandler.js";
import myRecipesHandler from './handlers/myRecipesHandler.js';
import logoutHandler from "./handlers/logoutHandler.js";
import searchHandler from "./handlers/searchHandler.js";

const app = express();
const port = 3000;

app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));

app.get('/', rootHandler);
app.post('/register', registerHandler);
app.post('/login', loginHandler);
app.get('/logout', logoutHandler);

app.get('/profile', getProfileHandler);
app.patch('/profile', updateProfileHandler);
app.delete('/profile', deleteProfileHandler);

app.get('/my_recipes', myRecipesHandler);

app.post('/recipes', createRecipeHandler);
app.get('/recipes', listRecipesHandler);
app.get('/recipes/:id', getRecipeHandler);

app.get('/featured', getFeaturedHandler);
app.get('/popular', getPopularHandler);

app.get('/search', searchHandler);

app.listen(port, () => {
  console.log(`Cookbook app listening at http://localhost:${port}`);
});
