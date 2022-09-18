const express = require('express');
const { registerUser, loginUser } = require('../controllers/authController');
const router = express.Router();
const { validatorLoginUser, validatorRegisterUser } = require("../validators/authValidator")

//TODO http://localhost:3001/api/auth

/**
 * TODO http://localhost:3001/api/auth/login
 * login usuario
 */
router.post('/login', validatorLoginUser, loginUser)

/**
 * TODO http://localhost:3001/api/auth/register
 * Crear un usuario
 */
router.post('/register', validatorRegisterUser, registerUser)

module.exports = router