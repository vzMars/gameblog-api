import express from 'express';
import * as postController from '../controllers/postController';
const router = express.Router();
import ensureAuth from '../middleware/auth';
import upload from '../middleware/multer';

router.use(ensureAuth);

router.get('/', postController.getPosts);
router.get('/tag/:tag', postController.getTag);
router.get('/:id', postController.getPost);
router.post('/', upload.single('file'), postController.createPost);
router.put('/:id', upload.single('file'), postController.editPost);
router.delete('/:id', postController.deletePost);

export default router;
