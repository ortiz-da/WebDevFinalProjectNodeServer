// CODE FROM: https://github.com/jannunzi/tuiter-node-server-app-cs4550-sp23/blob/project/follows/follows-dao.js

import followsModel from "./follows-model.js";

export const createFollow = async (follow) => {
    const newFollow = await followsModel.create(follow);
    return newFollow;
};

export const findFollowers = async (userId) => {
    console.log(`FINDING FOLLOWERS OF ${userId}`)
    const followers = await followsModel.find({ following: userId });

    console.log(followers)
    console.log("____")
    return followers;
};

export const findFollowing = async (userId) => {
    console.log(`FINDING USERS WHO ${userId} IS FOLLOWING`)
    const followed = await followsModel.find({ follower: userId });
    console.log(followed)
    return followed;
};

export const unfollow = async (follow) => {
    const deletedFollow = await followsModel.deleteOne(follow);
    return deletedFollow;
};