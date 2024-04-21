import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'PLEASE ADD A NAME'],
    },
    email: {
      type: String,
      required: [true, 'PLEASE ADD AN EMAIL'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'PLEASE ADD A PASSWORD'],
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
