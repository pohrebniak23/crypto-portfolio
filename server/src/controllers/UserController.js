/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
import UserModel from "../models/UserModel.js";

class UserController {
  async loginUser(request, response) {
    try {
      const { login, password } = request.body;

      const user = await UserModel.find({ login, password });
      
      if (user.length === 1) {
        response.status(200).json(user[0]);
      } else {
        response.status(500).json("User not found");
      }
    } catch (error) {
      response.status(500).json(error);
    }
  }

  async createUser(request, response) {
    try {
      const { login, password } = request.body;

      const isUser = await UserModel.find({ login, password });

      if (isUser.length !== 0) {
        return response.status(400).json({
          error: 'Email already there, No need to register again.',
        });
      }

      const createUser = await UserModel.create({ login, password });

      response.status(200).json(createUser);
    } catch (error) {
      response.status(500).json({
        error: 'Database error while registration user!',
      });
    }

    return null;
  }
}

export default new UserController();
