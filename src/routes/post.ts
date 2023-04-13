import express from 'express';
import * as postController from '../controllers/postController';
const router = express.Router();
import ensureAuth from '../middleware/auth';

router.use(ensureAuth);

router.get('/', postController.getPosts);
router.get('/:id', postController.getPost);
router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);

export default router;
