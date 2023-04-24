// import posts from "./comments.js";
import * as dao from "../comments/comments-dao.js"
import * as gamesDao from "../games/games-dao.js";
import {findLikesByUserId} from "../likes/likes-dao.js";
import likesModel from "../likes/likes-model.js";
import commentsModel from "./comments-model.js";
// using similar code to user controller
// CODE FROM https://github.com/jannunzi/tuiter-node-server-app-cs4550-sp23/blob/project/controllers/tuit-controller.js

const createComment = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
        console.log("NO CURRENT USER")
        res.sendStatus(401);
        return;
    }

    let game = await gamesDao.findGameById(req.params.gameId);
    if (!game) {
        console.log("USER COMMENTED ON GAME THAT IS NOT YET IN DATABASE")

        const newGame = {
            name: req.body.gameName,
            gameId: req.body.gameId,
        }

        console.log("CREATED THE FOLLOWING GAME IN DB")
        game = await gamesDao.createGame(newGame);
        console.log(game)
    }



    console.log("RECEIVED THIS COMMENT FROM FRONT END")
    console.log(req.body)

    const attemptedComment = {
        ...req.body,
        gameMongooseKey: game._id,
        likeCount: 0,
        gameName: req.body.gameName,
    }

    const newComment = await dao.createComment(attemptedComment)
    console.log("CREATED THIS COMMENT IN THE BACK END")
    console.log(newComment)
    res.json(newComment);
}

const findAllComments = async (req, res) => {
    console.log("FINDING ALL COMMENTS")
    const comments = await dao.findAllComments();
    res.json(comments);
};

const findCommentById = async (req, res) => {
    console.log("FINDING COMMeNT BY ID")

    const comment = await dao.findCommentById(req.params.id);
    res.json(comment);
};

const findCommentsByGameId = async (req, res) => {
    const comments = await dao.findCommentsByGameId(req.params.gameId);
    res.json(comments);
};

const updateComment = async (req, res) => {

    const status = await dao.updateComment(req.params.id, req.body);
    res.send(status);
};

const deleteComment = async (req, res) => {

    console.log("DELETING COMMENT")
    const status = await dao.deleteComment(req.params.id);
    res.send(status);
};

export const findCommentsByUserId = async (req, res) => {

    const userId = req.params.userId
    console.log("FINDING COMMENTS")
    const comments = await dao.findCommentsByUserId(userId);
    // const comments = await commentsModel.find({userId: uid  });
    res.json(comments);
};

export default (app) => {
    app.get("/api/comments", findAllComments);
    app.get("/api/comments/:id", findCommentById);
    app.get("/api/comments/game/:gameId", findCommentsByGameId)
    app.get("/api/comments/user/:userId", findCommentsByUserId)
    app.post("/api/comments", createComment);
    app.put("/api/comments/:id", updateComment);
    app.delete("/api/comments/:id", deleteComment);
}
