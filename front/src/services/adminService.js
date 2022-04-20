import axios from "axios";
const url = 'http://localhost:2000/'


export const keapLogin =() => {
    return axios.request(`${url}`)
}