// https://github.com/jannunzi/tuiter-node-server-app-cs4550-sp23/blob/project/likes/likes-dao.js
import likesModel from "./likes-model.js";

export const createLike = async (like) => {
    const newLike = await likesModel.create(like);
    return newLike;
};

export const deleteLike = async (like) => {
    const deletedLike = await likesModel.deleteOne(like);
    return deletedLike;
};

export const findLikeByGameId = async (gameId) => {
    const likes = await likesModel.find({ gameId });
    return likes;
};

export const findLikesByUserId = async (userId) => {

    const likes = await likesModel.find({ userId });

    return likes;
};

export const isAlreadyLiked = async (like) => {
    const alreadyLiked = await likesModel.exists(like)
    return alreadyLiked;

}

export const findAllLikes = async () => {
    const likes = await likesModel.find()
    return likes;

}