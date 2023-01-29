import cors from 'cors';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import AssetsRouter from './src/routes/AssetsRouter.js';
import TransactionsRouter from './src/routes/TransactionsRouter.js';
import UserRouter from './src/routes/UserRouter.js';

dotenv.config({ path: '.env.local' });

const PORT = 8000;
const DB_URL = `mongodb+srv://pohrebniak23:${process.env.MONGO_PASSWORD}@cluster0.nug2yy5.mongodb.net/?retryWrites=true&w=majority`;

const { json, urlencoded } = bodyParser;
const app = express();


app.use(
  cors({
    origin: '*',
  }),
);

app.use(json());
app.use(
  urlencoded({
    extended: true,
  }),
);

app.use('/assets', AssetsRouter);
app.use('/users', UserRouter);
app.use('/transactions', TransactionsRouter);

async function startApp() {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(DB_URL);

    app.listen(PORT, () => {
      console.log(`App running on PORT ${PORT}.`);
    });
  } catch (error) {
    console.log(error);
  }
}

startApp();