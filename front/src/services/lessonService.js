import {http} from "../utils/http";
import CourseController from "../../../controllers/course";
const url = '/auth/courses'

export const lessonStore = (data,id) => {
    return http.post(`${url}/${id}/lessons`, data)
}

export const lessonShow = (idCourse, idLesson) => {
    return http.get(`${url}/${idCourse}/lesson/${idLesson}`)
}

export const lessonFilterShow = (idCourse, idLesson) => {
    return http.get(`${url}/${idCourse}/lesson/${idLesson}/user`)
}

export const lessonUpdate = (idCourse, idLesson, data) => {
    return http.patch(`${url}/${idCourse}/lesson/${idLesson}`, data )
}

export const lessonDelete = (idCourse, idLesson) => {
    return http.delete(`${url}/${idCourse}/lesson/${idLesson}` )
}

export const lessonUpdateImage = (idCourse, idLesson, data) => {
    return http.patch(`${url}/${idCourse}/lesson/${idLesson}/image`, data )
}

export const lessonTimeUpdate = (idCourse, idLesson, percentage) => {
    return http.patch(`${url}/${idCourse}/lesson/${idLesson}/users`, {percentage} )
}

export const lessonOrderUpdate = (id, idLesson,position,moduleId) => {
    return http.patch(`${url}/${id}/lessons/${idLesson}/order`, {position, moduleId})
}
