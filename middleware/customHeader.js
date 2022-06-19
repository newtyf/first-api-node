const customHeader = (req, res, next) => {
  try {
    const api_key = req.headers.api_key

    if (api_key != undefined) {

      if (api_key === 'newt-admin') {
        next()
      } else {
        throw 'API_KEY_INVALIDA'
      }

    } else {
      throw 'SE_REQUIERE_UNA_API_KEY'
    }

  } catch (error) {
    res.status(403)
    res.send({error, msg: "ALGO_OCURRIO_EN_EL_HEADER" });
  }
}

module.exports = customHeader