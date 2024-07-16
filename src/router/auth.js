import express from 'express'
import authController from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.get("/list", authController.listAccount)

authRouter.post("/register", authController.register)
authRouter.post("/login", authController.login)
authRouter.post("/refresh-token", authController.refreshToken)
authRouter.post("/userinfo", authController.userinfo)

export default authRouter;