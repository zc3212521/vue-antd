import http from '@/base/axios'
import api from './api'

// // 全部权限
// const getAllAuth = (params = {}) => {
//   return http.post(api.queryAllAuth, params)
// }
// // 用户权限
// const getUserAuth = (params = {}) => {
//   return http.post(api.queryUserAuth, params)
// }
// 字典项
const getGlobalDict = (params) => {
  return http.post(api.getGlobalDict, params)
}

export {
  // getAllAuth,
  // getUserAuth,
  getGlobalDict
}
