import { Schema, model } from 'mongoose';

const categorySchema = new Schema({});

export const Category = model('Category', categorySchema);
