import axios from 'axios'
import Vue from 'vue'
import {getUserToken} from '@/state/token.js'

const http = axios.create({
  baseURL: 'http://119.23.53.78:8888/api/private/v1/',
  timeout: 3000
});



http.interceptors.response.use( res => {
  return res.data;
}, err => {
  return Promise.reject(err);
})

http.interceptors.request.use( config => {
  const userToken = getUserToken();
  if(userToken) {
    config.headers.Authorization = JSON.parse(userToken).token;
  }
  return config;
 }, err => {

 });

// Vue.prototype.$http = http;
export default http;

