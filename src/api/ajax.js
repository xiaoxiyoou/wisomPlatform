import axios from 'axios'
import store from './../store/index'
import qs from 'qs'
let uid = localStorage.getItem('userid')
let openid = localStorage.getItem('openid')
let token = localStorage.getItem('token')
// 取到sid
function getCaption(obj) {
  var index = obj.lastIndexOf("=");
  obj = obj.substring(index + 1, obj.length);
  return obj;
}
let fromUrl = localStorage.getItem('fromUrl')

export default function ajax(url = '', params = {}, type = 'GET') {
  let promise;
  // 1. 返回promise对象
  return new Promise((resolve, reject) => {
    // 1.1 判断请求的方式
    if (type === 'GET') {
      // 1.2 拼接字符串
      let paramsStr = '';
      Object.keys(params).forEach(key => {
        paramsStr += key + '=' + params[key] + '&'
      });
      // 1.3 过滤最后的&
      if (paramsStr !== '') {
        paramsStr = paramsStr.substr(0, paramsStr.lastIndexOf('&'));
      }
      // 1.4 拼接完整路径
      url += '?' + paramsStr;
      // 1.5 发起get请求
      promise = axios.get(url, {
        headers: {
          'uid': uid,
          'usrkey': openid,
          'token': token,
        }
      })
      store.dispatch('setStatus', true)
    } else if (type === 'POST') {
      // 1.6 发起post请求
      promise = axios.post(url, qs.stringify(params), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'uid': uid,
          'usrkey': openid,
          'token': token,
        }
      });
      store.dispatch('setStatus', true)
    }
    // 1.7 返回结果
    promise.then((response) => {
      resolve(response.data);
      store.dispatch('setStatus', false)
    }).catch(error => {
      reject(error)
      store.dispatch('setStatus', false)
    })
  });
}