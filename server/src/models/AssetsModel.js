/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';

const AssetsModel = new mongoose.Schema(
  {
    ticker: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    avgBuyPrice: {
      type: Number,
      required: true,
    },
  },
);

AssetsModel.virtual('id').get(function(){
  return this._id.toHexString();
});

AssetsModel.set('toJSON', {
  virtuals: true
});

export default mongoose.model('AssetsModel', AssetsModel);
