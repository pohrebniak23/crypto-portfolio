/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';

const TransactionsModel = new mongoose.Schema(
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
    price: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
);

TransactionsModel.virtual('id').get(function(){
  return this._id.toHexString();
});

TransactionsModel.set('toJSON', {
  virtuals: true
});

export default mongoose.model('TransactionsModel', TransactionsModel);
