import { Router } from 'express';
import multer from 'multer';

import { list, show, edit, destroy } from 'controllers/users';
import { checkJwt } from 'middleware/checkJwt';
import { validatorEdit } from 'middleware/validation/users';

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', [checkJwt], list);

router.post('/', [checkJwt], show);

router.patch('/', [checkJwt, validatorEdit, upload.single('file')], edit);

router.delete('/:id([0-9]+)', [checkJwt], destroy);

export default router;
