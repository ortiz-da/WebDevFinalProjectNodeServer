import gameModel from "./games-model.js";
// https://github.com/jannunzi/tuiter-node-server-app-cs4550-sp23/blob/project/albums/albums-dao.js
export const findGameById = async (gameId) =>
    await gameModel.findOne({ gameId });

export const createGame = async (game) => {
    const newGame = await gameModel.create(game);
    return newGame;
};

