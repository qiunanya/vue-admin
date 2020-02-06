import router from './index';
import {getToken} from '@/utils/app.tool'

const whiteRouter = ['/login'];

//路由守卫
router.beforeEach((to,from,next)=>{
    //to:要跳转的路由，from:当前路由，next：不带参数触发to,带参数触发
    //console.log(to,from,next)
    if (getToken()) {
        next();//要跳转的页面
       console.log('存在')  
    }else{
       console.log('不存在',to)
       if (whiteRouter.indexOf(to.path) !==-1) {
           next()//不会发生死循环
       }else{
           next('/login')
       }
    }
   // next()
 })