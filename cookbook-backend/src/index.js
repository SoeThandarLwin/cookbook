import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import rootHandler from './handlers/rootHandler.js';
import registerHandler from './handlers/registerHandler.js';
import loginHandler from './handlers/loginHandler.js';
import createRecipeHandler from './handlers/createRecipeHandler.js';
import listRecipesHandler from './handlers/listRecipesHandler.js';
import getRecipeHandler from "./handlers/getRecipeHandler.js";

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
  console.log(`Example app listening at http://localhost:${port}`);
});
