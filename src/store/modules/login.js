const login ={
    state: {
        qiuny:'邱南亚'
    },
    getters:{//等同于 computed，可以用于state值的操作
        qiu:state => state.qiuny+'1333'
    },
    mutations: {//同步：直接调用，不需要处理别的事情
        },
    actions: {
    },
    modules: {}
}

export default login;
