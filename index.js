const express = require('express')
require('dotenv').config()
const app = express()
const port = process.env.PORT
const passport = require('passport');
const InfusionsoftStrategy  = require('passport-infusionsoft').Strategy;
const axios = require('axios');
const bodyParser = require('body-parser');
const publicRoute = require('./routes/userApi');
const authRoute = require('./routes/courses');
const authInfusionsoft = require('./routes/keap')
const verify = require('./routes/verifyToken');
const passwordReset = require("./routes/passwordReset");
const importUser = require("./routes/import")
const cors = require('cors')
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const Infusion = require('./models/Infusionsoft')
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
require('./allcron');
require('./mongodb')
app.use('/api', publicRoute);
app.use('/api/infusionsoft', authInfusionsoft)
app.use('/api/auth', verify, authRoute)
app.use('/api/password-reset', passwordReset);
app.use('/api/import',verify, importUser)
const myCache = require('./myCache');
Sentry.init({
    dsn: "https://515d950e58334afcadfb753af5e410d5@o1080133.ingest.sentry.io/6085539",

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
});

const transaction = Sentry.startTransaction({
    op: "test",
    name: "My First Test Transaction",
});

setTimeout(() => {
    try {
        foo();
    } catch (e) {
        Sentry.captureException(e);
    } finally {
        transaction.finish();
    }
}, 99);

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/static/index.html')

})

app.listen(port, () => {
    console.log(`${process.env.BASE_URL}`)
})

passport.use(new InfusionsoftStrategy({
        clientID: process.env.CLIENTID,
        clientSecret: process.env.CLIENTSECRET,
        callbackURL: process.env.CALLBACKURL
    },
    function(accessToken, refreshToken, profile, done) {


            var tokens = {
                accessToken: accessToken,
                refreshToken: refreshToken
            };

            Infusion.deleteMany().then(res => {
               new Infusion(tokens).save().then(resp => {
                  myCache.set( "tokens", tokens, 0 );
                  return done(null, tokens);
                })
            })
    }
));

passport.serializeUser(function(user, done) {
    done(null, JSON.stringify(user));
});

passport.deserializeUser(function(user, done) {
    done(null, JSON.parse(user));
});

app.get('/auth/infusionsoft',
    passport.authenticate('Infusionsoft'),
    function(req, res){
    });

app.get('/auth/infusionsoft/callback',
    passport.authenticate('Infusionsoft', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    });


const retrieveId = (res,userId) =>{
    let userFind = res.data.contacts.map(res => res.id)
    userId = userFind[0];
    axios.get('https://api.infusionsoft.com/crm/rest/v1/contacts/'+userId+'/tags', {
        headers: {
            Accept: 'application/json, */*',
            Host: 'api.infusionsoft.com',
            Authorization: `Bearer ${myCache.get('tokens').accessToken}`
        }
    }).then(response =>{
        let tagId =(response.data.tags);
        const userTag = tagId.map(ele => ele.tag.id);
    })
}

