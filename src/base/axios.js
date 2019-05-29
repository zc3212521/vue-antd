import axios from 'axios'
import baseConfig from '@/baseConfig'
import qs from 'qs'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

const URLObj = baseConfig.baseURL
let baseURL = URLObj.dev
if (process.env.NODE_ENV === 'production') {
  baseURL = URLObj.prod
}
if (process.env.NODE_ENV === 'yapi') {
  baseURL = URLObj.yapi
}

export { baseURL }

axios.defaults.baseURL = baseURL
axios.defaults.withCredentials = false
axios.defaults.timeout = 5000
// axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'

axios.interceptors.request.use(function (request) {
  // Do something with request data
  console.log(555, request.url)
  if ((request.method === 'post' && request.url.indexOf('uploadfile') < 0) || request.method === 'put' || request.method === 'patch') { // post,put请求预处理
    // request.headers['Content-Type'] = 'application/json'
    request.data = qs.stringify(request.data)
  }
  request.headers['sessionId'] = '112233'
  axios.defaults.headers['X-Real-IP'] = '10.198.75.60'
  axios.defaults.headers['X-Forwarded-For'] = '10.198.75.60'
  return request
}, function (error) {
  // Do something with response error
  console.log('got ajax error', error)
  return Promise.reject(error)
})

// respone拦截器
axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response
}, function (error) {
  console.log('error', error)
})

export default axios
