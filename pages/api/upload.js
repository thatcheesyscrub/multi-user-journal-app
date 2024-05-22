import { v2 as cloudinary } from 'cloudinary';
import nextConnect from 'next-connect';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'journal',
    format: 'jpg',
    public_id: (req, file) => file.originalname,
  },
});

const upload = multer({ storage });

const apiRoute = nextConnect({
  onError(error, req, res) {
    console.error('Error in nextConnect:', error);
    res.status(501).json({ error: `Sorry, something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.use(upload.single('image'));

apiRoute.post((req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  console.log('Uploaded file:', req.file);
  res.status(200).json({ file: req.file });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};