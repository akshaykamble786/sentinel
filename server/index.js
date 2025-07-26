import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import authRouter from './routes/auth-routes.js';
import userRouter from './routes/user-routes.js';
import session from 'express-session';
import passport from 'passport';
import './config/passport.js';

const app = express();
const port = process.env.PORT || 5000;
const allowedOrigins = ['http://localhost:5173']
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use(session({
  secret: process.env.SESSION_SECRET || 'your-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
  },
}));
app.use(passport.initialize());

app.get('/', (req, res)=> res.send("API Working!!!"));

app.use('/auth', authRouter)
app.use('/user', userRouter);

app.listen(port, () => console.log(`Server running at http://localhost:5000`))