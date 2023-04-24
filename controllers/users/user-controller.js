import users from "./users.js";
import * as dao from "./users-dao.js"
import * as likesDao from "../likes/likes-dao.js";

// code from: https://github.com/jannunzi/tuiter-node-server-app-cs4550-sp23/commit/5604722ce48647c4a5c0fc8be9f204bb3f9b84a0#diff-143979c7b0747a9e674aeddf4a7ff71f6fd5e826204ca7f0a5f6eaed6d0dc78b


let currentUser = null;

const UsersController = (app) => {
    const findAllUsers = async (req, res) => {
        const users = await dao.findAllUsers();
        res.json(users);
    };
    const findUserById = async (req, res) => {
        // const user = users.find((user) => user.id === req.params.id);
        const user = await dao.findUserById(req.params.id);
        res.json(user);
    };
    const createUser = async (req, res) => {
        const user = req.body;

        // users.push(user);
        const newUser = await dao.createUser(user);
        res.json(newUser);
    };

    const updateUser = async (req, res) => {
        const user = req.body;
        // const index = users.findIndex((user) => user.id === req.params.id);
        // users[index] = user;
        console.log("UPDATING USER")
        console.log(req.body)
        const status = await dao.updateUser(req.params.id, user);
        // TODO this is probably bad
        // but it might work. Should only set current user to be the updated user if the edited profile's id is the same as the current user's id
        if(user._id === req.session["currentUser"]._id) {
            req.session["currentUser"] = user;
        }

        res.send(status);
    };
    const deleteUser = async (req, res) => {
        // const index = users.findIndex((user) => user.id === req.params.id);
        // users.splice(index, 1);
        const status = await dao.deleteUser(req.params.id);
        res.send(status);
    };

    // https://github.com/jannunzi/tuiter-node-server-app-cs4550-sp23/blob/project/controllers/users/users-controller.js
    const login = async (req, res) => {
        const user = await dao.findUserByCredentials(req.body);
        // users.find((user) => user.username === req.body.username);
        if (user) {
            console.log("USER EXISTS, LOGGING IN")

            req.session["currentUser"] = user;
            res.json(user);
        } else {
            console.log("USER DOES NOT EXIST")
            res.sendStatus(401);
        }
    };
    const logout = async (req, res) => {
        req.session.destroy();
        // currentUser = null;
        res.sendStatus(200);
    };
    const profile = async (req, res) => {
        // console.log("PROFILE REQUESTED")
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(404);
            return;
        }
        console.log("GIVING THE PROFILE")
        console.log(currentUser)
        res.send(currentUser);
    };
    const register = async (req, res) => {
        const user = req.body;
        // users.push(user);
        const existingUser = await dao.findUserByUsername(user.username);
        if (existingUser) {
            res.sendStatus(409);
            return;
        }
        const newUser = await dao.createUser(user);
        req.session.currentUser = newUser;
        res.json(newUser);
    };

    const findLikesByUserId = async (req, res) => {
        const userId = req.params.id;
        console.log(`FINDING LIKES FOR ${userId}`)

        const likes = await likesDao.findLikesByUserId(userId)
        res.json(likes);
    };

    const findAllLikes = async (req, res) => {
        console.log(`FINDING ALL LIKES`)

        const likes = await likesDao.findAllLikes()
        res.json(likes);
    };

    app.post("/api/users/login", login);
    app.post("/api/users/logout", logout);
    app.get("/api/users/profile", profile);
    app.get("/api/likes/:id", findLikesByUserId)
    app.get("/api/likes/", findAllLikes)

    app.post("/api/users/register", register);

    app.get("/api/users", findAllUsers);
    app.get("/api/users/:id", findUserById);
    app.post("/api/users", createUser);
    app.put("/api/users/:id", updateUser);
    app.delete("/api/users/:id", deleteUser);
};

export default UsersController;