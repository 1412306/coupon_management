const path = require('path');
const _ = require('lodash')
const jwtHelper = require(path.resolve('./core/helpers/jwt.helper'));
const bcrypt = require("bcrypt");
const config = global.config
const accessTokenLife = config.accessTokenLife || "1h";
const accessTokenSecret = config.accessTokenSecret;
const refreshTokenLife = config.refreshTokenLife || "1d";
const refreshTokenSecret = config.refreshTokenSecret;
const UserBusiness = require(path.resolve('./src/api/user/user.business'));
let tokenList = {};

const register = async (req, res) => {
    try {
        if(!req.body.username || !req.body.password || !req.body.email){
            return res.status(200).send({
                error: 'Missing required fields!'
            });
        }
        const userBusiness = new UserBusiness();
        existingUser = await userBusiness.findByEmail(req.body.email);
        if(existingUser.length){
            return res.status(200).send({
                error: 'Email already in use!'
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPW = await bcrypt.hash(req.body.password, salt);
        const user = {
            username: req.body.username,
            email: req.body.email,
            password: hashPW
        }

        let userSignup = await userBusiness.create(user);
        return res.status(200).json({user: {email: userSignup.email}, message:'Register success!'});
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            error: 'Something went wrong!'
        });
    }
}

const login = async (req, res) => {
    try {
        if(!req.body.password || !req.body.email){
            return res.status(200).send({
                error: 'Missing required fields!'
            });
        }
        const userBusiness = new UserBusiness();
        const existingUser = await userBusiness.findByEmail(req.body.email);
        if(!existingUser.length){
            return res.status(200).send({
                error: 'Email not exist'
            });
        }
        let correctPassword = bcrypt.compareSync(req.body.password, existingUser[0].password);
        if (!correctPassword) {
            return res.status(200).send({
                error: 'Password incorrect'
            });
        }
        //create accessToken
        const accessToken = await jwtHelper.generateToken(existingUser[0], accessTokenSecret, accessTokenLife);

        //create refreshToken
        const refreshToken = await jwtHelper.generateToken(existingUser[0], refreshTokenSecret, refreshTokenLife);

        tokenList[refreshToken] = {accessToken, refreshToken};

        return res.status(200).json({accessToken, refreshToken});
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: 'Something went wrong!'
        });
    }
}

const refreshToken = async (req, res) => {
    const refreshTokenFromClient = req.body.refreshToken;

    if (refreshTokenFromClient && (tokenList[refreshTokenFromClient])) {
        try {
            const decoded = await jwtHelper.verifyToken(refreshTokenFromClient, refreshTokenSecret);
            const userFakeData = decoded.data;
            const accessToken = await jwtHelper.generateToken(userFakeData, accessTokenSecret, accessTokenLife);
            return res.status(200).json({accessToken});
        } catch (error) {
            console.log(error);
            res.status(403).json({
                message: 'Invalid refresh token.',
            });
        }
    } else {
        return res.status(403).send({
            message: 'No token provided.',
        });
    }
};
module.exports = {
    register,
    login,
    refreshToken
}
