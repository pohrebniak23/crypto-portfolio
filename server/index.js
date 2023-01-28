/* eslint-disable import/extensions */
import pkg from 'body-parser';
import cors from 'cors';
import express from 'express';
import AssetsRouter from './src/routes/AssetsRouter.js';
import UserRouter from './src/routes/UserRouter.js';
import TransactionsRouter from './src/routes/TransactionsRouter.js';


const { json, urlencoded } = pkg;

const app = express();
const port = 8000;

app.use(json());
app.use(
  urlencoded({
    extended: true,
  }),
);
app.use('/assets', AssetsRouter);
app.use('/users', UserRouter);
app.use('/transactions', TransactionsRouter);

app.use(
  cors({
    origin: '*',
  }),
);



app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});


