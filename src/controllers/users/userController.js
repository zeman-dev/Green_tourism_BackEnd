import createHttpError from 'http-errors';
import { User } from '../../models/user.js';
import { Story } from '../../models/story.js';
import { saveFileToCloudinary } from '../../utils/saveFileToCloudinary.js';

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

export const updateUserAvatar = async (req, res) => {
  const { file, user } = req;
  if (!req.file) {
    throw createHttpError(400, 'No file');
  }
  const result = await saveFileToCloudinary(file.buffer, user._id);

  const updatedUser = await User.findOneAndUpdate(
    { _id: user._id },
    { avatarUrl: result.secure_url },
    { returnDocument: 'after' },
  );

  res.status(200).json({ url: updatedUser.avatarUrl });
};


export const getUsers = async (req, res ) => {
    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 10;
    const skip = (page - 1) * perPage;

    const [users, totalUsers] = await Promise.all([
      User.find()
        .select('-password -email')
        .sort({ createdAt: -1, _id: -1 }) 
        .skip(skip)
        .limit(perPage),
      User.countDocuments(),
    ]);

    const totalPages = Math.ceil(totalUsers / perPage);

    res.status(200).json({
      page,
      perPage,
      totalUsers,
      totalPages,
      users,
    });
  
};