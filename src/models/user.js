import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required:true,
  },
  avatar: {
    type: String,
    default: "https://ac.goit.global/fullstack/react/default-avatar.jpg",
  },
  savedArticles: {
  type: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Story',
    },
  ],
  default: [],
},

}, { timestamps: true });

export const User = model('User', userSchema);

