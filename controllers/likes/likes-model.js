// https://github.com/jannunzi/tuiter-node-server-app-cs4550-sp23/blob/project/likes/likes-model.js

import likesSchema from "./likes-schema.js";
import mongoose from "mongoose";
const likesModel = mongoose.model("likes", likesSchema);
export default likesModel;