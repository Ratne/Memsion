import {http} from "../utils/http";
const url = '/auth/courses'

export const modulesIndex = (id) => {
    return http.get(`${url}/${id}/modules`)
}

export const modulesStore = (id, data) =>{
    return http.post(`${url}/${id}/modules`, data)
}

export const moduleShow = (id, idModule) =>{
    return http.get(`${url}/${id}/modules/${idModule}`)
}

export const moduleDelete = (id, idModule) =>{
    return http.delete(`${url}/${id}/modules/${idModule}`)
}