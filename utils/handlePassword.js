const bcrypt = require("bcrypt")

/**
 * password without encrypt
 * @param {*} passwordPlain
 */
const encrypt = async (passwordPlain) => {
  const hash = await bcrypt.hash(passwordPlain, 10)
  // TODO: passwordPlain ==> $2b$04$1.dimfDpxz5tqzL......
  return hash
}

/**
 * passsword without encryp and password hash
 * @param {*} passwordPlain
 * @param {*} hashPassword
 */
const compare = async (passwordPlain, hashPassword) => {
  return await bcrypt.compare(passwordPlain, hashPassword)
}

module.exports = { encrypt, compare }