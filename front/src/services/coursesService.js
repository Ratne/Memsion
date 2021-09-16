import {http} from "../utils/http";
const url = '/auth/courses'
export const coursesIndex = () => {
    return http.get(url)
}

export const coursesStore = (data) => {
    return http.post(url, data)
}


export const coursesShow = (id) => {
    return http.get(`${url}/${id}`)
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
