import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';

import rootHandler from './handlers/rootHandler.js';
import registerHandler from './handlers/registerHandler.js';
import loginHandler from './handlers/loginHandler.js';
import createRecipeHandler from './handlers/createRecipeHandler.js';

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', rootHandler);
app.post('/register', registerHandler);
app.post('/login', loginHandler);

app.post('/recipes', createRecipeHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
