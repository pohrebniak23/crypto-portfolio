/* eslint-disable class-methods-use-this */
import pkg from 'pg';

const { Pool } = pkg;

const UserPool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432,
});

class UserController {
  async loginUser(request, response) {
    const { login, password } = request.body;

    UserPool.query(
      'SELECT * FROM users WHERE login = $1 AND password = $2',
      [login, password],
      (error, results) => {
        if (error) {
          throw error;
        }
        if (results.rowCount === 1) {
          response.status(200).json({ login, isAuth: true });
        } else {
          response.status(200).json({ login, isAuth: false });
        }
      },
    );
  }

  async createUser(request, response) {
    const { login, password } = request.body;

    try {
      const isUser = await UserPool.query(
        `SELECT * FROM users WHERE login = $1;`,
        [login],
      );
      const arr = isUser.rows;

      if (arr.length !== 0) {
        return response.status(400).json({
          error: 'Email already there, No need to register again.',
        });
      }

      UserPool.query(
        'INSERT INTO users (login, password) VALUES ($1, $2) RETURNING id',
        [login, password],
        (error, results) => {
          if (error) {
            return response.status(500).json({ error: `Database error` });
          } 
            return response
              .status(201)
              .json({ message: `User added with ID: ${results.rows[0].id}` });
        },
      );
    } catch (error) {
      return response.status(500).json({
        error: 'Database error while registring user!',
      });
    }

    return null;
  }
}

export default new UserController();
