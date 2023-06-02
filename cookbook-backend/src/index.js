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

app.get('/profile', getProfileHandler);
app.patch('/profile', updateProfileHandler);

app.post('/recipes', createRecipeHandler);
app.get('/recipes', listRecipesHandler);
app.get('/recipes/:id', getRecipeHandler);

app.listen(port, () => {
  console.log(`Cookbook app listening at http://localhost:${port}`);
});
