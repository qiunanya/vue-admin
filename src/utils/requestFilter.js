import axios from 'axios'
/**拦截器 */
let token = '1234sdhfshdifhsihf.ddhfhdohkd';
//console.log(process.env.NODE_ENV)
console.log(process.env.VUE_APP_TITLE)
//创建requet，赋给service
// 后端服务器请求地址 eg: http://www.web-jshtml.cn/productApi
const BASEURL = process.env.NODE_ENV === 'production' ? '' : 'devApi';
const service = axios.create({
    baseURL: BASEURL,//devApi ==http://www.web-jshtml.cn/productApi(vue.config.js)
    timeout: 5000,//请求超时
    headers: {
      'X-Custom-Header': 'foobar',
      'auth_token':token
    }
});

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

// service.request({
//         method: 'post',
//         url: '/user/12345',
//         data: {
//           firstName: 'Fred',
//           lastName: 'Flintstone'
//         }
// })

export default service; 

/**使用export default 暴露不需要花括号，但只能暴露一个
 * 使用export 暴露可以多个，但需要用花括号引用
*/