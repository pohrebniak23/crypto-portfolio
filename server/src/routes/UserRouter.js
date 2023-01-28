import { Router } from "express";
import UserController from "../controllers/UserController.js";

const UserRouter = new Router();

UserRouter.post('/login', UserController.loginUser);
UserRouter.post('/create', UserController.createUser);

export default UserRouter;