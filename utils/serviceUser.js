const axios = require("axios");
const myCache = require("../myCache");
const AutoLogin = require("../models/Autologin");
const updateInfusionsoftUser = (userId,userObjectId,userKey) =>{
    axios.get('https://api.infusionsoft.com/crm/rest/v1/contacts/model', {
        headers: {
            Accept: 'application/json, */*',
            Host: 'api.infusionsoft.com',
            Authorization: `Bearer ${myCache.get('tokens').accessToken}`
        }
    }).then(res =>{
        AutoLogin.findOne({}).then(resp=> {

            const fields = res.data.custom_fields.filter(ele =>{


                return   ele.field_name === resp?.customMemsionId || ele.field_name === resp?.memsionUserKey;


            })

            if (fields.length === 2){

                const body = {
                    "custom_fields": [
                        {
                            "id": fields.find(ele => ele.field_name === resp?.customMemsionId).id,
                            "content": userObjectId.toString()
                        },
                        {
                            "id": fields.find(ele => ele.field_name === resp?.memsionUserKey).id,
                            "content": userKey.toString()
                        }
                    ]
                }
                axios.patch(`https://api.infusionsoft.com/crm/rest/v1/contacts/${userId}`, body,{
                    headers: {
                        Accept: 'application/json, */*',
                        Host: 'api.infusionsoft.com',
                        Authorization: `Bearer ${myCache.get('tokens').accessToken}`
                    },
                }).then(res => {
                    console.log(res)
                })
            }
            else {
                console.log('errore memsion keys non inserite')
            }
        })


    }).catch(err => {
        console.log(err)
    })
}


module.exports = updateInfusionsoftUser;
