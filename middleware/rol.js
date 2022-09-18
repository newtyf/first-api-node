const {handleHttpError} = require('../utils/handleError')

/**
 * Arr with allowed rols
 * @param {*} rol
 * @returns
 */
const checkRol = (roles) => (req, res, next) => {
  try {
    const {user} = req
    const rolesByUser = user.role; //TODO ["user", ".....]

    const checkValueRol = roles.some((rolSingle) => rolesByUser.includes(rolSingle))

    if (!checkValueRol) {
      return handleHttpError(res, "USER_NOT_PERMISSIONS", 403)
    }
  } catch (error) {
    handleHttpError(res, "ERROR_PERMISSIONS")
  }


  next();
}

module.exports = { checkRol };
