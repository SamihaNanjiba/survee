const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});
passport.use(
    new GoogleStrategy(
        {
            proxy: true,
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: keys.redirectURI + '/auth/google/callback'
        }, 
        (accessToken, refreshToken, profile, done) => {
            console.log('profile: ', profile);
            
            User.findOne({ googleID: profile.id })
                .then((existingUser) => {
                    // console.log('Existing user', existingUser);
                    if(existingUser) {
                        // We already have a record of the given profile ID
                        // console.log('User', existingUser);
                        done(null, existingUser);
                    }else{
                        // We need to make a new record with the given profile ID
                        // console.log('here');
                        new User ({googleID: profile.id})
                        .save()
                        .then(user => done(null, user));
                    }
                })
        }
    )
);