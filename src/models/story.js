import { Schema, model } from 'mongoose';

const storySchema = new Schema(
  {
    img: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },
    article: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Categories',
      required: true,
    },
    rate: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

storySchema.index({ ownerId: 1 });
storySchema.index({ rate: -1, _id: 1 });
storySchema.index({ category: 1, rate: -1, _id: 1 });

export const Story = model('Story', storySchema);
