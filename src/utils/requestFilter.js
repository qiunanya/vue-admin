import axios from 'axios'
/**拦截器 */

//创建service，赋给service
const service = axios.create();

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
