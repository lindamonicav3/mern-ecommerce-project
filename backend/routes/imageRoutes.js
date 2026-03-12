const express = require('express');
const uniqid = require('uniqid');

const router = express.Router();

const multer = require('multer');

//to save the uploaded files in the same name as it comes in - configuration for it
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/img/');
  },
  filename: (req, file, cb) => {
    // console.log(file);
    cb(null, uniqid() + '_' + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post('/image-upload', upload.single('image'), (req, res) => {
  res.status(201).json({
    message: 'Image Uploaded',
    url: `http://localhost:5000/img/${req.file.filename}`,
  });
});

module.exports = router;
