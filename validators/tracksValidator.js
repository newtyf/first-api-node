const { check } = require('express-validator');
const {validateResults} = require('../utils/handleValidator')

const validatorCreateItem = [
  // vlaidate name
  check("name").exists().notEmpty(),//.isLength({min: 5, max: 90})

  //validate album
  check("album").exists().notEmpty(),

  //validate cover
  check("cover").exists().notEmpty(),

  //validate artist
  check("artist").exists().notEmpty(),

    /* validate artist name */
    check("artist.name").exists().notEmpty(),

    /* validate artist nickname */
    check("artist.nickname").exists().notEmpty(),

    /* validate artist nationality */
    check("artist.nationality").exists().notEmpty(),

  //validate duration
  check("duration").exists().notEmpty(),

    /* validate duration start */
    check("duration.start").exists().notEmpty(),

    /* validate duration end */
    check("duration.end").exists().notEmpty(),

  //validate mediaId
  check("mediaId").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next) // hace la validacion
  }

]

module.exports = validatorCreateItem