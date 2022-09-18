const { check } = require('express-validator');
const {validateResults} = require('../utils/handleValidator')

const validatorGetItem = [
  //validate mediaId
  check("id").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next) // hace la validacion
  }

]

module.exports = {validatorGetItem};