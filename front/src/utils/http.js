//wrapper

import axios from "axios";
const urlBase = process.env.VUE_APP_URL;

export const getUrl= (url) => url.startsWith('http') ? url : (urlBase + url);

const getConfig = (config = {}) => ({headers:{
    'Content-Type' : 'application/json'
}, ...config });

export const http = {
    get: (url, config) => httpBase.get(getUrl(url), getConfig(config)).then(res => res.data),
    delete: (url, config) => httpBase.delete(getUrl(url), getConfig(config)).then(res => res.data),
    post: (url, data, config) => httpBase.post(getUrl(url), data ,getConfig(config)).then(res => res.data),
    patch: (url, data, config) => httpBase.patch(getUrl(url), data ,getConfig(config)).then(res => res.data),
    put: (url, data, config) => httpBase.put(getUrl(url), data ,getConfig(config)).then(res => res.data),

};


export const httpBase = {
    get: (url, config) => axios.get(getUrl(url), config),
    delete: (url, config) => axios.delete(getUrl(url), config),
    post: (url, data, config) => axios.post(getUrl(url), data ,config),
    patch: (url, data, config) => axios.patch(getUrl(url), data ,config),
    put: (url, data, config) => axios.put(getUrl(url), data ,config),

}

