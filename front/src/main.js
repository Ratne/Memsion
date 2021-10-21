import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.min'
import axios from "axios";
import AuthInterceptorRequest from "./interceptors/AuthInterceptorRequest";
import AuthInterceptorResponse from "./interceptors/AuthInterceptorResponse";
import successInterceptor from "./interceptors/successInterceptor";
import errorInterceptor from "./interceptors/errorInterceptor";
axios.interceptors.request.use(AuthInterceptorRequest)
axios.interceptors.response.use((config)=> config,  AuthInterceptorResponse)
axios.interceptors.response.use(successInterceptor,  errorInterceptor)
createApp(App).use(store).use(router).mount('#app')
