import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import userModel from '../models/user-model.js';

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await userModel.findOne({ googleId: profile.id });
    if (!user) {
      const email = profile.emails && profile.emails[0]?.value;
      user = await userModel.findOne({ email });
      if (user) {
        user.googleId = profile.id;
        user.avatar = profile.photos && profile.photos[0]?.value;
        await user.save();
      } else {
        user = await userModel.create({
          name: profile.displayName,
          email,
          password: 'GOOGLE_OAUTH',
          googleId: profile.id,
          avatar: profile.photos && profile.photos[0]?.value,
          isAccountVerified: true,
        });
      }
    }
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport; 