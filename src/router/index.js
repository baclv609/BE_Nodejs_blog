import express from 'express';
const router = express.Router();
import postsRouter from "./posts.js"
import authRouter from './auth.js';
import categoryRouter from './categoryRouter.js';
// import upload from './upload.js';

router.use("/post", postsRouter)
router.use("/categories", categoryRouter)
router.use("/auth", authRouter)
// router.use("/upload", upload)
export default router;