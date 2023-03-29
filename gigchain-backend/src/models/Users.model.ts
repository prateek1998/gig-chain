import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    giggerId: {
      type: String,
      unique: true,
      required: true
  }, 
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const UserModel = mongoose.model('users', UserSchema);

export default UserModel;
