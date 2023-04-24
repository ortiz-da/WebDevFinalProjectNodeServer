import mongoose from "mongoose";
import gamesSchema from "./games-schema.js";
const gameModel = mongoose.model("GameModel", gamesSchema)
export default gameModel