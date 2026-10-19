import createHttpError from 'http-errors';
import { User } from '../../models/user.js';
import { Story } from '../../models/story.js';

export const getUserWithStories = async (req, res) => {
  const { userId } = req.params;
  const { page = 1, perPage = 10 } = req.query;

  const skip = (page - 1) * perPage;

  const user = await User.findById(userId);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const storiesQuery = Story.find({ ownerId: userId });

  const [totalStories, stories] = await Promise.all([
    storiesQuery.clone().countDocuments(),
    storiesQuery.sort({ date: -1, _id: 1 }).skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalStories / perPage);

  res.status(200).json({
    user: {
      _id: user._id,
      username: user.name,
      avatar: user.avatar,
      articlesAmount: user.articlesAmount,
    },
    page,
    perPage,
    totalStories,
    totalPages,
    stories,
  });
};

export const getCurrentUser = async (req, res) => {
  const user = req.user;

  res.status(200).json({
    user: {
      _id: user._id,
      username: user.name,
      avatar: user.avatar,
      articlesAmount: user.articlesAmount,
    },
  });
};
