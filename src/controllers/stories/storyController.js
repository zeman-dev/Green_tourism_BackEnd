import createHttpError from 'http-errors';
import { Story } from '../../models/story.js';
import { Categories } from '../../models/category.js';

/////{ALL STORIES} /////

export const getAllStories = async (req, res) => {
  const { page = 1, perPage = 10, category, type } = req.query;

  const skip = (page - 1) * perPage;
  const sort =
    type === 'popular' ? { rate: -1, _id: 1 } : { createdAt: -1, _id: -1 };

  const storiesQuery = Story.find();

  if (category) {
    const categoryDoc = await Categories.findOne({ category });
    if (categoryDoc === null) {
      throw createHttpError(404, 'Category not found');
    }
    storiesQuery.where('category').equals(categoryDoc._id);
  }

  const [totalStories, stories] = await Promise.all([
    storiesQuery.clone().countDocuments(),
    storiesQuery.sort(sort).skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalStories / perPage);

  res.status(200).json({
    page,
    perPage,
    totalStories,
    totalPages,
    stories,
  });
};

/////{RECOMMENDED STORIES} /////

export const getRecommendedStories = async (req, res) => {
  const { page = 1, perPage = 5, category } = req.query;

  const skip = (page - 1) * perPage;

  const storiesQuery = Story.find();

  if (category) {
    const categoryDoc = await Categories.findOne({ category });
    if (categoryDoc === null) {
      throw createHttpError(404, 'Category not found');
    }
    storiesQuery.where('category').equals(categoryDoc._id);
  }

  const [totalStories, stories] = await Promise.all([
    storiesQuery.clone().countDocuments(),
    storiesQuery.sort({ rate: -1, _id: 1 }).skip(skip).limit(perPage),
  ]);

  const totalPages = Math.ceil(totalStories / perPage);

  res.status(200).json({
    page,
    perPage,
    totalStories,
    totalPages,
    stories,
  });
};

/////{STORY BY ID} /////

export const getStoryById = async (req, res) => {
  const { storyId } = req.params;

  const story = await Story.findById(storyId)
    .populate('category', 'category')
    .populate('ownerId', 'name');

  if (!story) {
    throw createHttpError(404, 'Story not found');
  }

  res.status(200).json(story);
};

/////{ MY SAVED STORIES} /////

export const getMySavedStories = async (req, res) => {
  const { page = 1, perPage = 5 } = req.query;

  const skip = (page - 1) * perPage;

  const storiesQuery = Story.find({
    _id: { $in: req.user.savedArticles },
  }).populate('ownerId', 'name avatarUrl');

  const [totalStories, stories] = await Promise.all([
    storiesQuery.clone().countDocuments(),
    storiesQuery.skip(skip).limit(perPage).sort({ date: -1, _id: -1 }),
  ]);

  const totalPages = Math.ceil(totalStories / perPage);

  res.status(200).json({
    page,
    perPage,
    totalStories,
    totalPages,
    stories,
  });
};
