import mongoose from 'mongoose';

const UserModel = new mongoose.Schema({
  login: {
    type: String,
    required: true,
  },
  password: {
    type: Number,
    required: true,
  },
});

export default mongoose.model('UserModel', UserModel);