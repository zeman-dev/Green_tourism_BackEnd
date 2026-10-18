import createHttpError from "http-errors";
import { User} from "../../models/user.js";
import { Story } from "../../models/story.js";

export const addSavedArticle = async (req,res) => {
    const {storyId} = req.params;

    const story = await Story.findById(storyId).select('_id');

    if (!story){
        throw createHttpError(404, 'Story not found');
    }

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {$addToSet: {savedArticles: storyId}},
        {new: true},
    );

    if(!user){
        throw createHttpError(401,'User not found');
    }

    res.status(200).json({
        savedArticles: user.savedArticles,
    });
};

export const removeSavedArticle = async (req, res ) => {
    const { storyId } = req.params;

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {$pull: {savedArticles: storyId}},
        {new: true},
    );

    if(!user){
        throw createHttpError(401, 'User not found');
    }

    res.status(200).json({
        savedArticles:user.savedArticles,
    });
};