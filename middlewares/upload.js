import multer from 'multer';
import path from 'path';

const tempDir = path.resolve('tmp');

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    const extname = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extname);
    const suffix = crypto.randomUUID();

    cb(null, `${basename}-${suffix}${extname}`);
  },
});

const upload = multer({
  storage: multerConfig,
});

export default upload;
