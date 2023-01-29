/* eslint-disable class-methods-use-this */
import TransactionsModel from '../models/TransactionsModel.js';

class TransactionsController {
  async getAllTransactions(request, response) {
    try {
      const { userId } = request.query;

      const transactions = await TransactionsModel.find({ userId });
      response.status(200).json(transactions);
    } catch (error) {
      response.status(500).json(error);
    }
  }

  async getTransactionById(request, response) {
    try {
      const { userId, id } = request.query;

      const transactions = await TransactionsModel.find({ userId, id });
      response.status(200).json(transactions);
    } catch (error) {
      response.status(500).json(error);
    }
  }

  async getTransactionByTicker(request, response) {
    try {
      const { userId, ticker } = request.query;

      const transactions = await TransactionsModel.find({ userId, ticker });
      response.status(200).json(transactions);
    } catch (error) {
      response.status(500).json(error);
    }
  }

  async addNewTransaction(request, response) {
    try {
      const { userId, date, ticker, price, type, count } = request.body;

      const transactions = await TransactionsModel.create({
        userId,
        date,
        ticker,
        price,
        type,
        count,
      });
      response.status(200).json(transactions);
    } catch (error) {
      response.status(500).json(error);
    }
  }
}

export default new TransactionsController();
