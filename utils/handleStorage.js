const multer = require('multer');
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    const pathStorage = `${__dirname}/../storage`;

    callback(null, pathStorage);

  },
  filename: (req, file, callback) => {
    // mi-cv.pdf mi-foto.png mi-vide.mp4
    const ext = file.originalname.split('.').pop(); // ["name", "png"]
    const filename = `file-${Date.now()}.${ext}`;

    callback(null, filename);

  }
})

const uploadMiddleware = multer({storage})

module.exports = uploadMiddleware