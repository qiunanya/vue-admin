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

/**注册 */
