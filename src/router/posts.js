import express from 'express';
const router = express.Router();
import postController from '../controllers/postController.js';
import { checkPermisson } from '../middleware/checkPermisson.js';

router.get('/', postController.allPosts)

router.get('/:id', postController.getDetail)
router.post('/', checkPermisson, postController.create)
router.put('/:id', checkPermisson, postController.update)
router.delete('/:id', checkPermisson, postController.deletePost)

export default router;