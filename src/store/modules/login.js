import {GetSms,Register,Login} from '@/api/login'
const state = {
    isCollapse:JSON.parse(window.localStorage.getItem('isCollapse')) || false
}
const getters ={
    // es6 参数有多个时可以用（state,a,b）
    isCollapse:state=>state.isCollapse
}
const mutations ={
    //同步：直接调用，不需要处理别的事情
    SET_COLLAPSE(state){//改变左侧菜单状态 true关闭 false打开
        console.log('login')
        state.isCollapse = !state.isCollapse;
        // h5本地存储 localstorage(长期存储，关闭浏览器不会清除，需要手动清除)、sessionstorage(临时存储，关闭浏览器会清除)、cookie三种方式
        window.localStorage.setItem('isCollapse',JSON.stringify(state.isCollapse));
     }
}
const actions ={
     //异步：请求接口后，再去做别的事情，该函数的调用方法和mutations类似

     //登录处理，方便存取token
     login(content, requestData) {
         console.log('login',requestData)
        return new Promise((resolve, reject) => {
            Login(requestData).then((response) => {
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    }
}

export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
};
