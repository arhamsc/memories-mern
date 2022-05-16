import { Router } from 'express';
import {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    likePost,
} from '../controllers/posts.controller.js';

const router = Router();

router.route('/').get(getPosts).post(createPost);
router.route('/:id').patch(updatePost).delete(deletePost);
router.route('/:id/likePost').patch(likePost);

export default router;