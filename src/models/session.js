import {Schema, model} from "mongoose";

const sessionSchema = new Schema(
    {

}
);


export const Session = model("Session", sessionSchema);