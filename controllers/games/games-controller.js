// https://github.com/jannunzi/tuiter-node-server-app-cs4550-sp23/blob/project/albums/albums-controller.js

import * as gamesDao from "./games-dao.js";
import * as likesDao from "../likes/likes-dao.js";
import {isAlreadyLiked} from "../likes/likes-dao.js";

const GamesController = (app) => {
    const likeGame = async (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            console.log("NO CURRENT USER")
            res.sendStatus(401);
            return;
        }

        let game = await gamesDao.findGameById(req.params.gameId);
        if (!game) {
            game = await gamesDao.createGame(req.body);
        }

        const attemptedLike = {
            userId: currentUser._id,
            gameId: game.gameId,
            gameMongooseKey: game._id,
            gameName: game.name,
        }

        const isAlreadyLiked = await likesDao.isAlreadyLiked(attemptedLike)

        if(isAlreadyLiked) {
            console.log("USER ALREADY LIKED THIS GAME")
        }
        else {
            const like = await likesDao.createLike(attemptedLike);
            res.json(like);
        }



    };

    const unlikeGame = async (req, res) => {
        console.log("UNLIKING GAME")

        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            console.log("NO CURRENT USER")
            res.sendStatus(401);
            return;
        }

        let game = await gamesDao.findGameById(req.params.gameId);


        const attemptedUnlike = {
            userId: currentUser._id,
            gameId: game.gameId,
            gameMongooseKey: game._id,
        }


        const unlike = await likesDao.deleteLike(attemptedUnlike)
        res.json(unlike)
    }

    const getGameLikes = async (req, res) => {

        const gameLikes = await likesDao.findLikeByGameId(req.params.gameId)
        res.json(gameLikes)
    }

    app.post("/api/games/:gameId/likes", likeGame);
    app.get("/api/games/:gameId/likes", getGameLikes);
    app.delete("/api/games/:gameId/likes", unlikeGame);

};

export default GamesController;