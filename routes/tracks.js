const express = require('express');
const router = express.Router();
const customHeader = require('../middleware/customHeader');
const validatorCreateItem = require('../validators/tracksValidator');
const {getItems, getItem, createItem} = require("../controllers/tracksController")

// TODO http://localhost/tracks GET, POST, DELETE, PUT

router.get('/', getItems);

router.post('/', validatorCreateItem, customHeader, createItem);

module.exports = router