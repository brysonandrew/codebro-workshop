import * as express from 'express';
const router = express.Router();
import { uploadImage } from './actions/uploadImage';
const multer = require('multer');
const upload = multer({ dest: 'public/images/uploads/' });

router.use(express.Router());

router.post('/upload-image', upload.single('img'), uploadImage);

export default router;