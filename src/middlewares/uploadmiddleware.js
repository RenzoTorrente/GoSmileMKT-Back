const multer = require('multer')
const path = require('path');
const diskstorage = multer.diskStorage({
    destination: path.join(__dirname, '../images') ,
     filename: (req, file, cb) => {
     cb(null, Date.now() + '-imageprueba-' + file.originalname)
      }
    })
     const fileUpload = multer({
        storage: diskstorage
    }).single('image')


module.exports = fileUpload;