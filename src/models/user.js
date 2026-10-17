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

}, { timestamps: true });

export const User = model('User', userSchema);

