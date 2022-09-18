const { handleHttpError } = require('../utils/handleError')
const { verifyToken } = require('../utils/handleJwt')
const {usersModel} = require('../models')

const authMiddleware = async (req, res, next) => {
  try {

    if (!req.headers.authorization) {
      return handleHttpError(res, "NEED_SESSION", 401)
    }

    //req.headers.authorization //TODO Bearer 33d123@@...
    const token = req.headers.authorization.split(' ').pop();
    const dataToken = await verifyToken(token);

    if (!dataToken._id) {
      return handleHttpError(res, "ERROR_ID_TOKEN", 401);
    }

    const user = await usersModel.findById(dataToken._id)
    req.user = user

    next()

  } catch (error) {
    console.log(error.message);
    handleHttpError(res, "NOT_SESSION", 401);
  }
}

module.exports = { authMiddleware }