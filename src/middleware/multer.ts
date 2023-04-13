import multer from 'multer';
import path from 'path';
import createHttpError from 'http-errors';

const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
      return cb(createHttpError(415, 'File type is not supported'));
    }
    cb(null, true);
  },
});

export default upload;
