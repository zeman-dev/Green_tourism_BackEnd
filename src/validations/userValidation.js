import { Joi, Segments} from 'celebrate';


export const savedArticleParamsSchema = {
    [Segments.PARAMS]: Joi.object({
        storyId: Joi.string().hex().length(24).required(),
    }),
};