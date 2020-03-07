import ajax from './ajax';

/**  封装一个模块,包含应用中所有接口请求函数的模块 （对象） 能根据接口文档定义接口请求 */

// // 统一暴露
// export default AAA{

//     xxx(){

//     },

//     yyy(){

//     }

// }

const serverUrl = window.mgServer.serverUrl

const mgUrl = {
	//注册
	register: serverUrl + "/mg/user/register",
    //登录
    login : serverUrl + "/mg/user/login"
}

// 登录
// export function reqLogin(username,password){
//   return ajax('/mg/login',{username,password},'post')
// }
export const reqLogin = (username,password) => ajax(mgUrl.login,{username,password},'get')
// 注册 -- 参数直接放对象
export const reqRegister = (user) => ajax(mgUrl.register,user,'post')
