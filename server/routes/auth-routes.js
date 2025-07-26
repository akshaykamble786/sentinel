import express from "express";
import { isUserAuthenticated, login, logout, passwordResetOtp, register, resetPassword, sendVerifyOtp, verifyEmail } from "../controllers/auth-controller.js";
import userAuth from "../middlewares/user-auth.js";

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/send-verify-otp', sendVerifyOtp);
authRouter.post('/verify-account', verifyEmail);
authRouter.get('/is-auth', userAuth ,isUserAuthenticated);
authRouter.post('/send-reset-otp', passwordResetOtp);
authRouter.post('/reset-password', resetPassword);


export default authRouter