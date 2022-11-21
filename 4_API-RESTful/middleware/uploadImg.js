const multer = require('multer')
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../' + '/public/img'))
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({ storage }).single("thumbnail");

const handleImages = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) return res.status(500).json({ message: "Image couldn't be uploaded" });
    req.thumbnail = req.file.filename;
  });
  next();
}

module.exports = handleImages;