const express = require('express');
const router = express.Router();

const upload = require('../middleware/upload'); // <-- multer middleware
const {
  mergePDFs,
  compressPDF,
  wordToPDF,
  pdfToWord,
  jpgToPDF,
  compressJPG,
} = require('../controllers/pdfServicesController');

router.post('/merge', upload.array('files'), mergePDFs); // <-- use multer

// You can update the rest similarly:
router.post('/compress', upload.single('file'), compressPDF);
router.post('/word-to-pdf', upload.single('file'), wordToPDF);
router.post('/pdf-to-word', upload.single('file'), pdfToWord);
router.post('/jpg-to-pdf', upload.array('files'), jpgToPDF);
router.post('/compress-jpg', upload.single('file'), compressJPG);

module.exports = router;
