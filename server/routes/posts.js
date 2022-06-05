import { Router } from 'express';
import auth from '../middleware/auth.js';

import {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost,
    likePost,
    getPostsBySearch,
    commentPost
} from '../controllers/posts.js';

const router = Router();

router.route('/search').get(getPostsBySearch);
router.route('/').get(getPosts).post(auth, createPost);
router.route('/:id').get(getPost).patch(auth, updatePost).delete(auth, deletePost);
router.route('/:id/likePost').patch(auth, likePost);
router.route('/:id/commentPost').post(auth, commentPost);

export default router;
