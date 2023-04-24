// https://github.com/jannunzi/tuiter-node-server-app-cs4550-sp23/blob/project/likes/likes-schema.js

import mongoose from "mongoose";
const likesSchema = new mongoose.Schema(
    {
        // would be better for it to be a foreign key or something, but that was causing problems with searching
        userId: String,
        gameMongooseKey: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "GameModel",
        },
        gameId: String,
        gameName: String,
    },
    { collection: "likes" }
);

export default likesSchema;