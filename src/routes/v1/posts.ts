import { Router } from 'express';
import multer from 'multer';

import { create, list, destroy, edit, show } from 'controllers/posts';
import { checkJwt } from 'middleware/checkJwt';
import { BlobStorageService } from './../../services/blob-storage.service';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', [checkJwt], list);

router.get('/:id([0-9]+)', [checkJwt], show);

router.post('/', [checkJwt], create);

router.patch('/:id([0-9]+)', [checkJwt], edit);

router.delete('/:id([0-9]+)', [checkJwt], destroy);

router.post('/file', [checkJwt, upload.single('file')], async (req, res, next) => {
  const blob = new BlobStorageService();
  try {
    const { file } = req;
    const fileUrl = await blob.uploadFile(file.originalname, file);
    res.json({ fileUrl });
  } catch (error) {
    console.log({ error });
  }
});

export default router;
