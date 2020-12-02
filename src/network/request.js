import axios from 'axios'
import Vue from 'vue'

const http = axios.create({
  baseURL: 'http://119.23.53.78:8888/api',
  timeout: 3000
});

http.interceptors.response.use( res => {
  return res.data;
}, err => {
  return Promise.reject(err);
})

// Vue.prototype.$http = http;
export default http;

