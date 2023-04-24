import express from 'express';
import cors from 'cors'
import ExampleController from "./controllers/example-controller.js";
import UserController from "./controllers/users/user-controller.js";
import CommentsController from "./controllers/comments/comments-controller.js";
import mongoose from "mongoose"
mongoose.connect('mongodb://127.0.0.1:27017/gameDB')
import session from "express-session";
import GamesController from "./controllers/games/games-controller.js";
import FollowsController from "./controllers/follows/follows-controller.js";
const app = express();
app.use(
    cors({
        credentials: true,
        origin: "http://localhost:3000",
    })
);
app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true,
    })
);
app.use(express.json());

ExampleController(app)
UserController(app)
CommentsController(app)
GamesController(app)
FollowsController(app)
app.listen(4000)