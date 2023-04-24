import usersModel from "./users-model.js";
// using code from https://github.com/jannunzi/tuiter-node-server-app-cs4550-sp23/commit/5604722ce48647c4a5c0fc8be9f204bb3f9b84a0#diff-31ef4d526609ccbb8f039de94530ec6f90834b186a9ce97619551c072ca0de78

export const findAllUsers = async () => {
    const users = await usersModel.find();
    return users;
};

export const findUserById = async (id) => {
    const user = await usersModel.findById(id);
    return user;
};

export const findUserByUsername = async (username) => {
    // const user = await usersModel.find({username});
    const user = await usersModel.findOne({ username });
    return user;
};

export const findUserByCredentials = async ({ username, password }) => {
    const user = await usersModel.findOne({ username, password });
    return user;
};

export const createUser = async (user) => {
    const newUser = await usersModel.create(user);
    return newUser;
};

export const updateUser = async (id, user) => {
    const status = await usersModel.updateOne({ _id: id }, user);
    return status;
};

export const deleteUser = async (id) => {
    const status = await usersModel.deleteOne({ _id: id });
    return status;
};