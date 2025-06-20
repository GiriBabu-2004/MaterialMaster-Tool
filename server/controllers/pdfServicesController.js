const { PDFDocument } = require('pdf-lib');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');


const uploadsDir = path.join(__dirname, '../uploads');

// Helper to save uploaded files
const saveUploadedFile = (file) => {
  const filePath = path.join(uploadsDir, file.name);
  return new Promise((resolve, reject) => {
    file.mv(filePath, (err) => {
      if (err) return reject(err);
      resolve(filePath);
    });
  });
};

exports.mergePDFs = async (req, res) => {
  try {
    const files = req.files;
    if (!files || files.length < 2) {
      return res.status(400).send('Please upload at least two PDF files.');
    }

    const mergedPdf = await PDFDocument.create();

    for (const file of files) {
      const fileBuffer = fs.readFileSync(file.path);
      const pdf = await PDFDocument.load(fileBuffer);
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
      copiedPages.forEach((page) => mergedPdf.addPage(page));
      fs.unlinkSync(file.path);
    }

    const mergedPdfBytes = await mergedPdf.save();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=merged.pdf');
    res.send(Buffer.from(mergedPdfBytes));
  } catch (error) {
    console.error('MergePDF error:', error);
    res.status(500).send('Failed to merge PDF files.');
  }
};

exports.compressPDF = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send('No PDF file uploaded.');
    }

    const inputPath = file.path;
    const outputPath = path.join(uploadsDir, `compressed_${file.originalname}`);

    const gsPath = `"C:/Program Files/gs/gs10.05.1/bin/gswin64c.exe"`; // Adjust if needed

    const command = `${gsPath} -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/screen -dNOPAUSE -dQUIET -dBATCH -sOutputFile="${outputPath}" "${inputPath}"`;

    console.log('Running command:', command);

    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error('Ghostscript execution error:', err);
        console.error('Ghostscript stderr:', stderr);
        return res.status(500).send('PDF compression failed due to Ghostscript error.');
      }

      if (!fs.existsSync(outputPath)) {
        console.error('Output file not found after compression:', outputPath);
        return res.status(500).send('PDF compression failed: output file missing.');
      }

      try {
        const compressed = fs.readFileSync(outputPath);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=compressed_${file.originalname}`);
        res.send(compressed);
      } catch (readErr) {
        console.error('Error reading compressed file:', readErr);
        return res.status(500).send('Failed to read compressed PDF.');
      } finally {
        fs.unlink(inputPath, () => {});
        fs.unlink(outputPath, () => {});
      }
    });
  } catch (error) {
    console.error('CompressPDF unexpected error:', error);
    res.status(500).send('Failed to compress PDF due to server error.');
  }
};

// Word to PDF conversion - working version with LibreOffice + Puppeteer
exports.wordToPDF = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).send('No Word file uploaded.');

    const inputPath = file.path;
    const outputDir = path.dirname(inputPath);

    // Build LibreOffice command to convert DOCX to PDF
    // Adjust path if your soffice.exe location is different
    const libreOfficePath = `"C:\\Program Files\\LibreOffice\\program\\soffice.exe"`;

    const command = `${libreOfficePath} --headless --convert-to pdf --outdir "${outputDir}" "${inputPath}"`;
    console.log('Running command:', command);

    exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error('LibreOffice conversion error:', error);
    console.error('LibreOffice stderr:', stderr);
    return res.status(500).send('Failed to convert Word to PDF using LibreOffice.');
  }

  console.log('LibreOffice stdout:', stdout);

  // List files in output directory
  const files = fs.readdirSync(outputDir);
  console.log('Files in output directory:', files);

  // Find the PDF file produced
  const pdfFile = files.find(f => f.toLowerCase().endsWith('.pdf'));

  if (!pdfFile) {
    console.error('No PDF file found in output directory');
    return res.status(500).send('PDF output file not found after conversion.');
  }

  const outputPDFPath = path.join(outputDir, pdfFile);

  const pdfBuffer = fs.readFileSync(outputPDFPath);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename="${pdfFile}"`);
  res.send(pdfBuffer);

  // Cleanup
  fs.unlinkSync(inputPath);
  fs.unlinkSync(outputPDFPath);
});

  } catch (err) {
    console.error('wordToPDF unexpected error:', err);
    res.status(500).send('Failed to convert Word to PDF.');
  }
};

// PDF to Word conversion - currently disabled (LibreOffice cannot convert PDF -> DOCX)

exports.pdfToWord = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).send('No PDF file uploaded.');

    const inputPath = file.path;
    const outputDir = path.dirname(inputPath);

    // Full path to LibreOffice soffice.exe
    const libreOfficePath = `"C:\\Program Files\\LibreOffice\\program\\soffice.exe"`;

    // Command to convert PDF to DOCX
    const command = `${libreOfficePath} --headless --convert-to docx --outdir "${outputDir}" "${inputPath}"`;
    console.log('Running command:', command);

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error('LibreOffice conversion error:', error);
        console.error('LibreOffice stderr:', stderr);
        return res.status(500).send('Failed to convert PDF to Word using LibreOffice.');
      }

      console.log('LibreOffice stdout:', stdout);
       console.log('LibreOffice stderr:', stderr); 

      // Look for generated DOCX file in output directory
      const files = fs.readdirSync(outputDir);
      const docxFile = files.find(f => f.toLowerCase().endsWith('.docx'));

      if (!docxFile) {
        console.error('No DOCX file found in output directory');
        return res.status(500).send('DOCX output file not found after conversion.');
      }

      const outputDocxPath = path.join(outputDir, docxFile);

      // Send DOCX file back
      const docxBuffer = fs.readFileSync(outputDocxPath);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
      res.setHeader('Content-Disposition', `attachment; filename="${docxFile}"`);
      res.send(docxBuffer);

      // Cleanup uploaded PDF and generated DOCX
      fs.unlinkSync(inputPath);
      fs.unlinkSync(outputDocxPath);
    });
  } catch (err) {
    console.error('pdfToWord unexpected error:', err);
    res.status(500).send('Failed to convert PDF to Word.');
  }
};





exports.jpgToPDF = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).send('No JPG files uploaded.');
    }

    const pdfDoc = await PDFDocument.create();

    for (const file of req.files) {
      const imageBuffer = await sharp(file.path)
        .resize({ width: 800 }) // Optional: you can remove or adjust this
        .jpeg()
        .toBuffer();

      const embeddedImage = await pdfDoc.embedJpg(imageBuffer);
      const page = pdfDoc.addPage([embeddedImage.width, embeddedImage.height]);

      page.drawImage(embeddedImage, {
        x: 0,
        y: 0,
        width: embeddedImage.width,
        height: embeddedImage.height,
      });

      fs.unlinkSync(file.path); // Clean up the uploaded JPG file
    }

    const pdfBytes = await pdfDoc.save();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=converted.pdf');
    res.send(Buffer.from(pdfBytes));
  } catch (error) {
    console.error('JPG to PDF conversion failed:', error);
    res.status(500).send('Failed to convert JPG to PDF');
  }
};


exports.compressJPG = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).send('No JPG file uploaded.');

    const outputBuffer = await sharp(file.path)
      .jpeg({ quality: 50 }) // You can adjust the quality here (0–100)
      .toBuffer();

    fs.unlinkSync(file.path); // Delete original

    res.setHeader('Content-Type', 'image/jpeg');
    res.setHeader('Content-Disposition', 'attachment; filename=compressed.jpg');
    res.send(outputBuffer);
  } catch (error) {
    console.error('Compress JPG error:', error);
    res.status(500).send('Failed to compress JPG.');
  }
};