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