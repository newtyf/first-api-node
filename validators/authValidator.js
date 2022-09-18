const { check } = require('express-validator');
const { validateResults } = require('../utils/handleValidator')

const validatorLoginUser = [
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({ min: 3, max: 15 }),

  (req, res, next) => {
    return validateResults(req, res, next) // hace la validacion
  }

]

const validatorRegisterUser = [
  check("name").exists().notEmpty().isLength({ min: 3, max: 50 }),
  check("age").exists().notEmpty().isNumeric(),
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({ min: 3, max: 15 }),

  (req, res, next) => {
    return validateResults(req, res, next) // hace la validacion
  }
]

module.exports = { validatorLoginUser, validatorRegisterUser };