/**
 * 能发送异步ajax的函数模块
 * 封装axios库
 * 函数的返回值是一个promise对象
 * 
 * 1、优化：统一处理请求异常
 *     在外层包一个自己创建的promise对象
 *     在请求出错时，不reject（error），而是显示错误提示
 * 2、优化：异步得到的不想是response，而是respone.data
 *     在请求成功resolve时：resolve（response.data）
 * 
 * axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(function () {
    // always executed
  });  
 * 
 * axios.post('/user', {
    firstName: 'Fred',
    lastName: 'Flintstone'
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
 */

import axios from 'axios';
import {message } from 'antd'


// url一定要传  data不一定，所以必须指定一个值空对象，请求类型默认给GET
export default function ajax(url, data = {}, type = 'get') {


  return new Promise((resolve, reject) => {
   
    let promise
    
    // 1、执行异步ajax请求
    if (type === 'get') {
      promise = axios.get(url, {//配置对象，不能随便写
        params: data
      })
    } else { // 发post请求
      promise = axios.post(url, data)
    }

    // 2、如果成功了，调用resolve（value）
    promise.then(response => {
      resolve(response.data)
    })

    // 3、如果失败了，不调用reject（reason），而是提示异常信息
    .catch(error => {
      // reject(error)
      message.error('请求出错了：' + error.message)

    })
    
})

    

 }
