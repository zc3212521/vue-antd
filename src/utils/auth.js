import { JSEncrypt } from 'jsencrypt'

const jsePublicKey = 'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMIFJPPoh5auYAQnhCwFnQOdeZgUEF7n9tbIhImRGmqCguGT64GRrv73SJr4qc+IkkQy3eZrNboSXJOG9yYojzMCAwEAAQ=='

/**
 * 生成jse加密实例
 * @returns {JSEncrypt}
 */
const jseInstance = () => {
  let jse = new JSEncrypt()
  jse.setPublicKey(jsePublicKey)
  return jse
}

/**
 * 加密登录密码
 * @param pw 输入的密码字符串
 * @returns {PromiseLike<ArrayBuffer>}
 */
const encryptionPW = (pw) => {
  let jse = jseInstance()
  return jse.encrypt(pw)
}

/**
 * 解密登录密码
 * @param pw 输入的密码字符串
 * @returns {PromiseLike<ArrayBuffer>}
 */
const decryptPW = (pw) => {
  let jse = jseInstance()
  return jse.decrypt(pw)
}

const getToken = () => {
  return sessionStorage.getItem('token')
}

export {
  getToken,
  encryptionPW,
  decryptPW
}
