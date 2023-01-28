import { Router } from 'express';
import AssetsController from '../controllers/AssetsController.js';

const AssetsRouter = new Router();

AssetsRouter.get('/', AssetsController.getAllAssets);
AssetsRouter.get('/id', AssetsController.getAssetsById);

export default AssetsRouter;
