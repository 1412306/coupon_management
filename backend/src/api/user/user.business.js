"use strict";
const path = require("path");
const _ = require("lodash");

const UserModel = require(path.resolve("./src/api/user/user.model"));

module.exports = class UserBusiness {
    async create(data) {
        try {
            return await UserModel.create(data)
        } catch (e) {
            throw new Error(e);
        }
    }

    async findByEmail(email) {
        try {
            return await UserModel.find({email: email})
        } catch (e) {
            throw new Error(e);
        }
    }

};
