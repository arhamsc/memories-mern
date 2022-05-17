import { Router } from 'express';
import auth from '../middleware/auth.js';

import {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    likePost,
} from '../controllers/posts.js';

const router = Router();

router.route('/').get(getPosts).post(auth, createPost);
router.route('/:id').patch(auth, updatePost).delete(auth, deletePost);
router.route('/:id/likePost').patch(auth, likePost);

export default router;
