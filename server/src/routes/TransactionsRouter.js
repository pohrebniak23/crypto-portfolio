import { Router } from "express"
import TransactionsController from "../controllers/TransactionsController.js";

const TransactionsRouter = new Router();

TransactionsRouter.get('/', TransactionsController.getAllTransactions);
TransactionsRouter.get('/id', TransactionsController.getTransactionById);
TransactionsRouter.get('/ticker', TransactionsController.getTransactionByTicker);
TransactionsRouter.post('/new', TransactionsController.addNewTransaction);

export default TransactionsRouter;