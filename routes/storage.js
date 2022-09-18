const express = require('express');
const router = express.Router();
const uploadMiddleware = require('../utils/handleStorage');
const { validatorGetItem } = require("../validators/storageValidator")
const { createItem, getItem, getItems, deleteItem } = require('../controllers/storageController')
// http://localhost:3001/api/storage

/**
 * Lista los items
 */
router.get('/', getItems);

/**
 * Obtener detalle de items
 */
router.get("/:id", validatorGetItem, getItem)

/**
 * Crear un item
 */
router.post('/', uploadMiddleware.single("myfile"), createItem)

/**
 * Elimiar un item
 */
router.delete("/:id",validatorGetItem, deleteItem);

module.exports = router