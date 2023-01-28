/* eslint-disable class-methods-use-this */
import pkg from 'pg';

const { Pool } = pkg;

const TransactionsPool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
});

class TransactionsController {
  async getAllTransactions(request, response) {
    const userId = parseInt(request.query.userId, 10);

    TransactionsPool.query(
      'SELECT * FROM transactions WHERE "userId" = $1 ORDER BY id ASC',
      [userId],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      },
    );
  }

  async getTransactionById(request, response) {
    const id = parseInt(request.query.id, 10);
    const userId = parseInt(request.query.userId, 10);

    TransactionsPool.query(
      'SELECT * FROM transactions WHERE "userId" = $1 AND id = $2',
      [userId, id],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      },
    );
  }

  async getTransactionByTicker(request, response) {
    const { ticker, userId } = request.query;

    TransactionsPool.query(
      'SELECT * FROM transactions WHERE "userId" = $1 AND ticker = $2',
      [userId, ticker],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      },
    );
  }

  async addNewTransaction(request, response) {
    const { userId, date, ticker, price, type, count } = request.body;

    TransactionsPool.query(
      'INSERT INTO transactions ("userId", date, ticker, price, type, count) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
      [userId, date, ticker, price, type, count],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      },
    );
  }
}

export default new TransactionsController();
