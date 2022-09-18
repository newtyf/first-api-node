const { matchedData } = require("express-validator");
const { handleHttpError } = require('../utils/handleError')
const { tokenSign } = require("../utils/handleJwt");
const { encrypt, compare } = require("../utils/handlePassword");
const { usersModel } = require("../models");

/**
 * login users with jwt and compare password with hash password
 * @param {*} req
 * @param {*} res
 */
const loginUser = async (req, res) => {
  try {
    req = matchedData(req);

    const user = await usersModel.findOne({email: req.email}).select('password name role email age')
    if (!user) {
      return handleHttpError(res, "USER_NOT_EXISTS", 404)
    }

    const hashPassword = user.password;
    const check = await compare(req.password, hashPassword)

    if (!check) {
      return handleHttpError(res, "PASSWORD_INVALID", 401)
    }

    user.set("password", undefined, {strict: false})
    const data = {
      token: await tokenSign(user),
      user: user,
      date: new Date(),
    }

    res.send({data});
  } catch (error) {
    console.log(error.message);
    handleHttpError(res, "ERROR_LOGIN_USER")
  }
};

/**
 * regiser users, encrypt passwords and create jwt
 * @param {*} req
 * @param {*} res
 */
const registerUser = async (req, res) => {
  try {
    req = matchedData(req);

    const passwordHash = await encrypt(req.password);
    const body = { ...req, password: passwordHash };

    const dataUser = await usersModel.create(body);
    dataUser.set("password", undefined, { strict: false });

    const data = {
      token: await tokenSign(dataUser),
      user: dataUser,
    };

    res.send({ data });
  } catch (error) {
    console.log(error.message);
    handleHttpError(res, "ERROR_REGISTER_USER")
  }
};

module.exports = { registerUser, loginUser };
