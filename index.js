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
const verify = require('./routes/verifyToken');
const passwordReset = require("./routes/passwordReset");
const importUser = require("./routes/import")
const cors = require('cors')


app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
//app.use(upload.array());
require('./allcron');
require('./mongodb')
app.use('/api', publicRoute);
app.use('/api/auth', verify, authRoute)
app.use('/api/password-reset', passwordReset);
app.use('/api/import',verify, importUser)
const myCache = require('./myCache');

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/static/index.html')

})

app.listen(port, () => {
    console.log(`Demo http://localhost:${port}`)
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

app.get('/auth/infusionsoft',
    passport.authenticate('Infusionsoft'),
    function(req, res){
    });

app.get('/auth/infusionsoft/callback',
    passport.authenticate('Infusionsoft', { failureRedirect: '/login' }),
    function(req, res) {
        res.redirect('/');
    });


//demo test
app.get('/auth/call', (req, res) =>{
    axios.get('https://api.infusionsoft.com/crm/rest/v1/account/profile', {
        headers: {
            Accept: 'application/json, */*',
            Host: 'api.infusionsoft.com',
            Authorization: `Bearer ${myCache.get('tokens').accessToken}`
        }
    }).then(res =>{
       // FAI COSE
        console.log(res)
    }).catch(err => {
        // GESTISCI ERRORE
        console.log(err)
    })
})

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



//demo retrieve id from email
app.get('/test', (req, res) =>{
    let userId = req.user.infusionsoftId;
    retrieveId(res,userId)
})