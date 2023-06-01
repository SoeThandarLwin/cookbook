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

const app = express();
const port = 3000;

app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', rootHandler);
app.post('/register', registerHandler);
app.post('/login', loginHandler);

app.post('/recipes', createRecipeHandler);
app.get('/recipes', listRecipesHandler);
app.get('/recipes/:id', getRecipeHandler);

app.listen(port, () => {
  console.log(`Cookbook app listening at http://localhost:${port}`);
});
