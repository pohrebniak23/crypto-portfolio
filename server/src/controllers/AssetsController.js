/* eslint-disable class-methods-use-this */
import pkg from 'pg';

const { Pool } = pkg;

const AssetsPool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
});

class AssetsController {
  async getAllAssets(request, response) {
    const userId = parseInt(request.query.userId, 10);

    AssetsPool.query(
      'SELECT * FROM assets WHERE "userId" = $1 ORDER BY id ASC',
      [userId],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      },
    );
  }

  async getAssetsById(request, response) {
    const id = parseInt(request.query.id, 10);
    const userId = parseInt(request.query.userId, 10);

    AssetsPool.query(
      'SELECT * FROM assets WHERE "userId" = $1 AND id = $2',
      [userId, id],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      },
    );
  }
}

export default new AssetsController();
