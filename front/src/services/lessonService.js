import {http} from "../utils/http";
const url = '/auth/courses'

export const lessonStore = (data,id) => {
    return http.post(`${url}/${id}/lessons`, data)
}

export const lessonShow = (idCourse, idLesson) => {
    return http.get(`${url}/${idCourse}/lesson/${idLesson}`)
}

export const lessonUpdate = (data) => {
    return http.patch(`${url}/${data._id}`, data )
}

export const lessonDelete = (idCourse, idLesson) => {
    return http.delete(`${url}/${idCourse}/lesson/${idLesson}` )
}
