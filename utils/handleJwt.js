const JWT = require("jsonwebtoken")
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * pass the object user
 * @param {*} user
 */
const tokenSign = async (user) => {
  const sign = JWT.sign(
    {
      _id: user._id,
      role: user.role
    },
    JWT_SECRET,
    {
      expiresIn: "2h",
    }
  )

  return sign;
}

/**
 * pass the session jwt
 * @param {*} tokenJwt
 * @returns
 */
const verifyToken = async (tokenJwt) => {
  try {
    return JWT.verify(tokenJwt, JWT_SECRET)
  } catch (error) {
    return null
  }
}

module.exports = { tokenSign, verifyToken }