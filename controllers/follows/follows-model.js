// CODE FROM: https://github.com/jannunzi/tuiter-node-server-app-cs4550-sp23/blob/project/follows/follows-model.js

import mongoose from "mongoose";
import followsSchema from "./follows-schema.js";
const followsModel = mongoose.model("follows", followsSchema);
export default followsModel;