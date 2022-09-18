const express = require('express');
const fs = require('fs');
const router = express.Router()

const PATH_ROUTES = __dirname; // la ruta absoluta, el path donde se encuentra el archivo

const removeExtension = (filename) => {
  // tracks.js => [tracks, js] => tracks
  return filename.split('.').shift();
}

fs.readdirSync(PATH_ROUTES).filter((file) => {
  const name = removeExtension(file);
  if (name !== 'index') {
    console.log("cargando ruta "+name);
    router.use(`/${name}`, require(`./${file}`)) // http://localhost/api/${name}
  }
})

module.exports = router