// file storage setup

import multer from 'multer';
import path from 'path';
import File from '../models/fileModel.js';

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|pdf/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      return cb(new Error('File upload only supports the following filetypes - ' + filetypes));
    }
  }
});

const uploadMiddleware = (req, res, next) => {
  upload.single('file')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded or incorrect field name' });
    }

    try {
      const { testname } = req.body;
      if (!testname) {
        return res.status(400).json({ message: 'testname is required' });
      }

      const dateUploaded = new Date().toISOString().replace(/:/g, '-');
      const fileExtension = path.extname(req.file.originalname);
      const filename = `${testname}-${dateUploaded}${fileExtension}`;

      const file = new File({
        filename,
        data: req.file.buffer,
        contentType: req.file.mimetype
      });

      await file.save();

      req.file.id = file._id;
      next();
    } catch (error) {
      console.error('Error saving file:', error);
      return res.status(500).json({ message: 'File upload failed' });
    }
  });
};

export default uploadMiddleware;
