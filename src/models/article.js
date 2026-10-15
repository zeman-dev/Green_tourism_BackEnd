import {Schema, model} from "mongoose";

const articleSchema = new Schema(
    {

}
);


export const Article = model("Article", articleSchema);