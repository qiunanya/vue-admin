import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse:false
  },
  getters:{
      // es6 参数有多个时可以用（state,a,b）
      isCollapse:state=>state.isCollapse
  },
  mutations: {
      SET_COLLAPSE(state){//改变左侧菜单状态 true关闭 false打开
         state.isCollapse = !state.isCollapse;
      },
      SET_ISCOLLAPSE(state,value){
          state.isCollapse = value;
      }
  },
  actions: {},
  modules: {}
});
