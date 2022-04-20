const myCache = require('./myCache');
const mongoose = require('mongoose');
const Infusion = require('./models/Infusionsoft')
const refreshTokenCall = require("./utils/refreshAction");
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(()=> {
    console.log('siamo connessi');
    Infusion.findOne({}).then(res => {
        res?.refreshToken && refreshTokenCall(res.refreshToken)        //todo: manda email ad amministratore per ricollegare infusionsoft
    })

}).catch((err)=> {
    console.log('connection failed', err);
});
