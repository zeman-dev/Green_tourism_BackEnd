import { Joi, Segments } from 'celebrate';

export const getRecommendedStoriesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(30).default(5),
    category: Joi.string().trim(),
  }),
};

export const getAllStoriesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(30).default(10),
    category: Joi.string().optional(),
    type: Joi.string().valid('popular').optional(),
  }),
};

export const getStoryByIdSchema = {
  [Segments.PARAMS]: Joi.object({
    storyId: Joi.string().hex().length(24).required(),
  }),
};

export const paginationSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(30).default(10),
  }),
};

export const createStorySchema = {
  [Segments.BODY]: Joi.object({
    img: Joi.string().trim().required(),
    title: Joi.string().trim().required(),
    article: Joi.string().trim().required(),
    category: Joi.string().hex().length(24).required(),
    date: Joi.date().iso().required(),
  }),
};
