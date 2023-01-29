import mongoose from 'mongoose';

const TransactionsModel = new mongoose.Schema({
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
});

export default mongoose.model('TransactionsModel', TransactionsModel);