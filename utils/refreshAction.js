const myCache = require("../myCache");
const nodeBase64 = require("nodejs-base64-converter");
const axios = require("axios");
const Infusion = require("../models/Infusionsoft");

const refreshTokenCall = (refreshToken) =>{
    let data = process.env.CLIENTID+':'+process.env.CLIENTSECRET;
    let base64data = nodeBase64.encode(data)
    const params = new URLSearchParams()
    params.append('grant_type', 'refresh_token')
    params.append('refresh_token', refreshToken)
    axios.post('https://api.infusionsoft.com/token',
        params,
        {headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization : 'Basic ' + base64data
            }}).then(res =>{
        var tokens = {
            accessToken: res.data.access_token,
            refreshToken: res.data.refresh_token
        };
        Infusion.deleteMany().then(res => {
            new Infusion(tokens).save().then(resp => {
                myCache.set( "tokens", tokens, 0 );
            })
        })
        // Refresh done
    }).catch(err =>{
        console.log(err)     //todo: manda email ad amministratore per ricollegare infusionsoft
    })
}

module.exports = refreshTokenCall;
