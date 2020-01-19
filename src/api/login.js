import service from '@/utils/requestFilter'

/**获取验证码 */
export function GetSms(val){
    console.log(111,val)
   service.request({
       method:"post",
       url:"/getSms/",
       data:val
   })
}

/**获取用户角色 */

/**登录 */

/**注册 */
