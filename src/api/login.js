import service from '@/utils/requestFilter'

/**获取验证码 */
export function GetSms(val){
  //返回响应数据
   return service.request({
       method:"post",
       url:"/getSms/",
       data:val
   })
}

/**获取用户角色 */

/**登录 */
export function Login(val){
    return service.request({
      method:"post",
      url:"/login/",
      data:val
    });
}
/**注册 */
export function Register(val){
    return service.request({
      method:"post",
      url:"/register/",
      data:val
    });
}
