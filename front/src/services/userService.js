import {http} from "../utils/http";
const url = '/user-list'



export const userList = () => {
    return http.get(`${url}`)
}

export const userShow = (id) => {
    return http.get(`${url}/${id}`)
}

export const userDel = (id) => {
    return http.delete(`${url}/delete-user/${id}`)
}

export const userUpdate = (id,data) => {
    return http.patch(`${url}/user-update/${id}`, data)
}

export const userAdd = (data) => {
    return http.post('/register', data)
}


export const customIdUpdate = (data) => {
    return http.post('/custom-key', data)
}

export const customKeyGet = () => {
    return http.get('/custom-key')
}
export const customerUpdate = () => {
    return http.post('/customer-update')
}

export const importUser = (data) => {
    return http.post("/import", data )
}

export const autoLogin = (data) =>{
    return http.post("/autologin", data )
}

export const passwordResetCall = (data) =>{
    return http.post("/password-reset", data )
}
