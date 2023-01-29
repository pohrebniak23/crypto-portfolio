/* eslint-disable class-methods-use-this */
import AssetsModel from "../models/AssetsModel.js";

class AssetsController {
  async getAllAssets(request, response) {
    try {
      const { userId } = request.query;

      const asset = await AssetsModel.find({ userId });
      response.status(200).json(asset);

    } catch (error) {
      response.status(500).json(error)
    }
  }

  async getOneAsset(request, response) {
    try {
      const { ticker, userId } = request.query;

      const asset = await AssetsModel.find({ userId, ticker });
      response.status(200).json(asset);

    } catch (error) {
      response.status(500).json(error)
    }
  }

  async addNewAssets(request, response) {
    try {
      const { ticker, count, userId, avgBuyPrice } = request.body;

      const assets = await AssetsModel.create({ ticker, count, userId, avgBuyPrice });
      response.status(200).json(assets);
    } catch (error) {
      response.status(500).json(error)
    }
  }
}

export default new AssetsController();
