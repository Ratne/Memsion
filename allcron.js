const cron = require("node-cron");
const axios = require('axios');
const myCache = require('./myCache');
var nodeBase64 = require('nodejs-base64-converter');
const refreshTokenCall = require("./utils/refreshAction");
require('dotenv').config()

// refresh token @ 6H
cron.schedule("0 */6 * * *", function() {
    const refreshToken = myCache.get('tokens').refreshToken;
    refreshTokenCall(refreshToken)
});
