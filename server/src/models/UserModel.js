/* eslint-disable object-shorthand */
/* eslint-disable no-underscore-dangle */
import mongoose from 'mongoose';

const UserModel = new mongoose.Schema(
  {
    login: {
      type: String,
      required: true,
    },
    password: {
      type: Number,
      required: true,
    },
  },
  { id: false },
);

UserModel.virtual('id').get(function(){
  return this._id.toHexString();
});

UserModel.set('toJSON', {
  virtuals: true
});

export default mongoose.model('UserModel', UserModel);
