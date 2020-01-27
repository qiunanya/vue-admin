import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

//引用布局组件,当文件夹下存在index.vue时可以不用写，默认加载的
import Layout from "@/views/layout"

const routes = [{
        path: "/",
        redirect: "/login",
        hidden:true,
        meta:{
            name:"主页"
        }
    },
    {
        path: "/login",
        name: "login",
        hidden:true,
        meta:{
            name:"登录"
        },
        component: () =>
            import ("../views/login/index")
    },
    {
        path: "/console",
        name: "console",
        redirect:"/console/index",//当跳转console，会重定向控制台index页面，
        meta:{
            name:"控制台",
            icon:"console"
        },
        component: Layout,
            children:[
                {
                    path: "/console/index",
                    name: "console-index",
                    meta:{
                        name:"首页"
                    },
                    component: () =>
                        import ("../views/console/index")
                },
            ]
    },
    {
        path: "/infoManage",
        name: "Info-Manage",
        meta:{
            name:"信息管理",
            icon:"info"
        },
        component: Layout,
            children:[
                {
                    path: "/info/index",
                    name: "Info-Index",
                    meta:{
                        name:"信息列表"
                    },
                    component: () =>
                        import ("../views/info/index")
                },
                {
                    path: "/info/category",
                    name: "Info-Category",
                    meta:{
                        name:"信息分类"
                    },
                    component: () =>
                        import ("../views/info/infoCategory")
                },
            ]
    },
    {
        path: "/userManage",
        name: "UserManage",
        meta:{
            name:"用户管理",
            icon:"user"
        },
        component: Layout,
            children:[
                {
                    path: "/user/index",
                    name: "User-Index",
                    meta:{
                        name:"用户列表"
                    },
                    component: () =>
                        import ("../views/user/index")
                },
                
            ]
    }

];

const router = new VueRouter({
    routes
});

export default router;