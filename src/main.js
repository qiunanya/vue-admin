import Vue from "vue";
import App from "./App.vue";
import router from "./router/index";
import store from "./store/index";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/icon'
import './router/guard'
import global from '@/utils/global'

//自定义全局方法
Vue.use(global)
//自定义全局组件
Vue.use(ElementUI);
Vue.config.productionTip = false;



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
