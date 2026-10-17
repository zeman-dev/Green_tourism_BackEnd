import { Joi, Segments } from 'celebrate';

export const getRecommendedStoriesSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(5).max(30).default(5),
    category: Joi.string().trim(),
  }),
};
