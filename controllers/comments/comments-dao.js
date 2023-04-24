import usersModel from "../users/users-model.js";

import commentsModel from "../comments/comments-model.js"
// based on code from https://github.com/jannunzi/tuiter-node-server-app-cs4550-sp23/commit/5604722ce48647c4a5c0fc8be9f204bb3f9b84a0#diff-31ef4d526609ccbb8f039de94530ec6f90834b186a9ce97619551c072ca0de78


export async function deleteComment(id) {
    const status = await commentsModel.deleteOne({ _id: id });
    return status;
}

export async function updateComment(id, comment) {
    const status = await commentsModel.updateOne({ _id: id }, comment);
    return status;
}

export async function findCommentsByGameId(gameId) {
    // https://stackoverflow.com/a/54741405

    const comments = await commentsModel.find({gameId: gameId}).sort({_id: -1});
    return comments;
}

export async function findCommentById(id) {
    const comment = await commentsModel.findById(id);
    return comment;
}

export async function findAllComments() {
    // https://stackoverflow.com/a/54741405
    const comments = await commentsModel.find().sort({_id: -1});
    return comments;
}

export async function findCommentsByUserId(userId) {
    // https://stackoverflow.com/a/54741405
    const comments = await commentsModel.find({userId}).sort({_id: -1});
    return comments;
}

export async function createComment(comment) {
    const newComment = await commentsModel.create(comment);
    return newComment;
}
