const cron = require("node-cron");
const axios = require('axios');
const myCache = require('./myCache');
var nodeBase64 = require('nodejs-base64-converter');
require('dotenv').config()

// refresh token @ 6H
cron.schedule("0 */6 * * *", function() {
    const refreshToken = myCache.get('tokens').refreshToken;
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

           myCache.set( "tokens", tokens, 0 );
           // Refresh done
       }).catch(err =>{
           console.log(err)
       })
});