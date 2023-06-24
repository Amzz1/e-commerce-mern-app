
import express from 'express';
import multer from 'multer';


const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const fileName = Date.now() + '-' + file.originalname.replace(/%| |\$|&|@/g, 'p');
    const encodedFileName = encodeURIComponent(fileName);
    cb(null, encodedFileName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/png', 'image/jpg'];
  if (file.mimetype.startsWith('image/') && allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only PNG and JPG files are allowed.'), false);
  }
};

const upload = multer({ storage, fileFilter });

router.post('/', upload.single('image'), (req, res) => {
  res.setHeader('Content-Security-Policy', "default-src 'self'; font-src 'self' http://localhost:5000;");
  const imageUrl = `/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

export default router;


