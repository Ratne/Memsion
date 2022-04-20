const passport = require("passport");
const {Strategy: InfusionsoftStrategy} = require("passport-infusionsoft");
const myCache = require("../myCache");
const router = require('express').Router();

passport.use(new InfusionsoftStrategy({
        clientID: process.env.CLIENTID,
        clientSecret: process.env.CLIENTSECRET,
        callbackURL: process.env.CALLBACKURLCONFIG
    },
    function(accessToken, refreshToken, profile, done) {


        const tokens = {
            accessToken: accessToken,
            refreshToken: refreshToken
        };
        myCache.set( "tokens", tokens, 0 );
        return done(null, tokens);

    }
));

passport.serializeUser(function(user, done) {
    done(null, JSON.stringify(user));
});

passport.deserializeUser(function(user, done) {
    done(null, JSON.parse(user));
});

router.get('/auth/infusionsoft',
    passport.authenticate('Infusionsoft'),
    function(req, res){
    });

router.get('/auth/infusionsoft/callback',
    passport.authenticate('Infusionsoft', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    });


module.exports = router;