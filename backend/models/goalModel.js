import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true,
  },
  postImage: {
    type: String,
  },
}, {
  timestamps: true,
});

const Goal = mongoose.model('Goal', goalSchema);

export default Goal;
