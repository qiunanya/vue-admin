import router from './index';
import store from "../store/index";
import {getToken,removeToken,removeUserName} from '@/utils/app.tool'

const whiteRouter = ['/login'];

//路由守卫
router.beforeEach((to,from,next)=>{
    //to:要跳转的路由，from:当前路由，next：不带参数触发to,带参数触发
    //console.log(to,from,next)
    if (getToken()) {//用户登录后地址栏输入login,切到登陆页，清除token
        if (to.path==='/login') {//1.控制非法进入后台 （1 和2 二选项一）
           removeToken();
           removeUserName();
           store.commit('login/set_userName','');
           store.commit('login/set_accessToken')
           next(); 
        }else{
            //获取用户角色
            //动态分配路由权限
           next(); 
        }
        //2.next();//要跳转的页面
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