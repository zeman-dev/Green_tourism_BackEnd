import { Schema, model } from 'mongoose';

const storySchema = new Schema({});

export const Story = model('Story', storySchema);
