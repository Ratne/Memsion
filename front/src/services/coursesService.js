import {http} from "../utils/http";
const url = '/auth/courses'

export const coursesIndex = () => {
    return http.get(url)
}

export const coursesFilterIndex = () => {
    return http.get(`${url}/user`)
}

export const coursesStore = (data) => {
    return http.post(url, data)
}


export const coursesShow = (id) => {
    return http.get(`${url}/${id}`)
}

export const coursesFilterShow = (id) => {
    return http.get(`${url}/${id}/user`)
}

export const coursesShowMenu = (id) => {
    return http.get(`${url}/${id}/menu`)
}

export const coursesAddVoiceMenu = (id, data) => {
    return http.post(`${url}/${id}/menu`, data)
}

export const coursesEditVoiceMenu = (id, data) => {
    return http.patch(`${url}/${id}/menu/edit`, data)
}


export const coursesUpdate = (data) => {
    return http.patch(`${url}/${data._id}`, data )
}

export const coursesUpdateImage = (id, data) => {
    return http.patch(`${url}/${id}/image`, data )
}

export const coursesDelete = (id) => {
    return http.delete(`${url}/${id}` )
}

export const courseDeleteMenu = (id, idMenu) => {
    return http.delete(`${url}/${id}/menu/${idMenu}` )
}

export const courseReport = (id) => {
    return http.get(`${url}/${id}/report`)
}

export const listAllLesson = (id) => {
    return http.get(`${url}/${id}/list_lessons`)
}
