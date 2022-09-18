const fs = require("fs")
const { matchedData } = require('express-validator');
const {storageModel} = require('../models');
const { handleHttpError } = require('../utils/handleError');

const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

/**
 * Obtener lista de la base de datos
 * @param {*} req
 * @param {*} res
 */
const getItems  = async (req,res) => {
  try {
    const data = await storageModel.find({});
    res.send({data})
  } catch (error) {
    handleHttpError(res, "ERROR_GET_ITEMS");
    console.log(error);
  }
};

/**
 * Obtener un detalle
 * @param {*} req
 * @param {*} res
 */
const getItem  = async (req,res) => {
  try {
    const {id} = matchedData(req)
    const data = await storageModel.findById(id)
    res.send({data})
  } catch (error) {
    handleHttpError(res, "ERROR_DETAIL_ITEM");
    console.log(error);
  }
};

/**
 * Insertar un registro
 * @param {*} req
 * @param {*} res
 */
const createItem = async (req,res) => {
  try {
    //const body = req.body; ==> is the same but if you have a req.body you can use destructuring varaibles
  const { body, file } = req;

  console.log({file});
  const fileData = {
    url: `${PUBLIC_URL}/${file.filename}`,
    filename: file.filename
  }
  const data = await storageModel.create(fileData)
  console.log("*** storage schema created ***")

  res.send({data})
  } catch (error) {
    handleHttpError(res, "ERROR_CREATE_ITEM")
    console.log(error);
  }
};

/**
 * Eliminar un registro
 * @param {*} req
 * @param {*} res
 */
const deleteItem  = async (req,res) => {
  try {
    const {id} = matchedData(req)
    const dataFile = await storageModel.findById(id)
    await storageModel.deleteOne({_id: id})
    const {filename} = dataFile
    const filePath = `${MEDIA_PATH}/${filename}` // TODO c:miproyecyo/file1234.png
    fs.unlinkSync(filePath);
    const data = {
      filePath,
      deleted: 1
    }
    console.log("*** storage schema adn file deleted ***")
    res.send({data})
  } catch (error) {
    handleHttpError(res, "ERROR_DELETE_ITEM");
    console.log(error);
  }
};

module.exports = {getItems, getItem, createItem, deleteItem};