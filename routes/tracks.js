const express = require('express');
const router = express.Router();
const customHeader = require('../middleware/customHeader');
const {validatorCreateItem, validatorGetItem} = require('../validators/tracksValidator');
const {getItems, getItem, createItem, updateItem, deleteItem} = require("../controllers/tracksController");
const { authMiddleware } = require('../middleware/session');
const { checkRol } = require('../middleware/rol');

// TODO http://localhost/tracks GET, POST, DELETE, PUT

/**
 * Lista los items
 */
router.get('/', authMiddleware ,getItems);

/**
 * Obtener detalle de items
 */
router.get("/:id", authMiddleware, validatorGetItem ,getItem)

/**
 * Crear un registro
 */
router.post('/', authMiddleware, checkRol(["admin"]), validatorCreateItem, customHeader, createItem);

/**
 * Actualizar un registro
 */
router.put("/:id", authMiddleware, validatorGetItem, validatorCreateItem, updateItem);

/**
 * Elimiar un registro
 */
router.delete("/:id", authMiddleware, validatorGetItem, deleteItem);

module.exports = router