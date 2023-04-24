import mongoose from "mongoose";

const gamesSchema = new mongoose.Schema(
    {
        name: String,
        gameId: String,
    },
    {collection: "games"}
)
export default gamesSchema