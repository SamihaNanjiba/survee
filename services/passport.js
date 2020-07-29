const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        }, 
        (accessToken, refreshToken, profile, done) => {
            
            User.findOne({ googleID: profile.id })
                .then((existingUser) => {
                    if(existingUser) {
                        // We already have a record of the given profile ID
                    }else{
                        // We need to make a new record with the given profile ID
                        new User ({googleID: profile.id}).save();
                    }
                })
        
            // console.log('access token',accessToken);
            // console.log('refresh token', refreshToken);
            // console.log('profile', profile);
        }
    )
);