import { Schema, model } from 'mongoose';

const categoriesSchema = new Schema({
  category: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});

export const Categories = model('Categories', categoriesSchema);
