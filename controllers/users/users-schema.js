import mongoose from "mongoose";

const usersSchema = new mongoose.Schema(
    {
        username: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        role: {type: String, default: "normal"},
        pfp: {
            type: String,
            default: "https://play-lh.googleusercontent.com/8ddL1kuoNUB5vUvgDVjYY3_6HwQcrg1K2fd_R8soD-e2QYj8fT9cfhfh3G0hnSruLKec"
        },
        createdOn: {type: Date, default: Date.now},
    },
    {collection: "users"}
);

export default usersSchema;