import mongoose from 'mongoose';

const AssetsModel = new mongoose.Schema({
  ticker: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
  },
  avgBuyPrice: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('AssetsModel', AssetsModel);