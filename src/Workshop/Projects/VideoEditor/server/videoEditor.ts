import * as express from 'express';
const router = express.Router();
import { uploadVideo } from './actions/uploadVideo';
import { convertVideo } from './actions/convertVideo';
const multer = require('multer');
const upload = multer({ dest: 'public/images/uploads/' });

router.use(express.Router());

router.post('/upload-video', upload.single('video'), uploadVideo);
router.post('/convert-video', convertVideo);

export default router;