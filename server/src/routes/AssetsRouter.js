import { Router } from 'express';
import AssetsController from '../controllers/AssetsController.js';

const AssetsRouter = new Router();

AssetsRouter.get('/', AssetsController.getAllAssets);
AssetsRouter.get('/getOne', AssetsController.getOneAsset);
AssetsRouter.post('/add', AssetsController.addNewAssets);

export default AssetsRouter;
