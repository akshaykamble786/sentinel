import express from "express";
import { isUserAuthenticated, login, logout, passwordResetOtp, register, resetPassword, sendVerifyOtp, verifyEmail } from "../controllers/auth-controller.js";
import userAuth from "../middlewares/user-auth.js";
import passport from 'passport';
import jwt from 'jsonwebtoken'

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/send-verify-otp', sendVerifyOtp);
authRouter.post('/verify-account', verifyEmail);
authRouter.get('/is-auth', userAuth ,isUserAuthenticated);
authRouter.post('/send-reset-otp', passwordResetOtp);
authRouter.post('/reset-password', resetPassword);
authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get('/google/callback', passport.authenticate('google', {
  failureRedirect: process.env.FRONTEND_URL + '/login',
  session: false,
}), (req, res) => {
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.redirect(process.env.FRONTEND_URL + '/dashboard');
});


export default authRouter