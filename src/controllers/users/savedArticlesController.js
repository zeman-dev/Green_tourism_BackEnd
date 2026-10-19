import createHttpError from 'http-errors';
import { User } from '../../models/user.js';
import { Story } from '../../models/story.js';

export const addSavedArticle = async (req, res) => {
  const { storyId } = req.params;

  const story = await Story.findById(storyId).select('_id');

  if (!story) {
    throw createHttpError(404, 'Story not found');
  }

  const user = await User.findOneAndUpdate(
    { _id: req.user._id, savedArticles: { $ne: storyId } },
    { $addToSet: { savedArticles: storyId } },
    { new: true },
  );

  if (user) {
    await Story.updateOne({ _id: storyId }, { $inc: { rate: 1 } });

    res.status(200).json({
      savedArticles: user.savedArticles,
    });
    return;
  }

  const currentUser = await User.findById(req.user._id);
  if (!currentUser) {
    throw createHttpError(401, 'User not found');
  }

  res.status(200).json({
    savedArticles: currentUser.savedArticles,
  });
};

export const removeSavedArticle = async (req, res) => {
  const { storyId } = req.params;

  const user = await User.findOneAndUpdate(
    { _id: req.user._id, savedArticles: storyId },
    { $pull: { savedArticles: storyId } },
    { new: true },
  );

  if (user) {
    await Story.updateOne(
      { _id: storyId, rate: { $gt: 0 } },
      { $inc: { rate: -1 } },
    );

    res.status(200).json({
      savedArticles: user.savedArticles,
    });
    return;
  }

  const currentUser = await User.findById(req.user._id);

  if (!currentUser) {
    throw createHttpError(401, 'User not found');
  }

  res.status(200).json({
    savedArticles: currentUser.savedArticles,
  });
};
