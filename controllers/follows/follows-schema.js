// CODE FROM: https://github.com/jannunzi/tuiter-node-server-app-cs4550-sp23/blob/project/follows/follows-schema.js

import mongoose from "mongoose";
const followsSchema = new mongoose.Schema(
    {
        follower: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
        following: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
        },
    },
    { collection: "follows" }
);

export default followsSchema;