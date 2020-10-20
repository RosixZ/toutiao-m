import axios from 'axios'
import store from '@/store/'
import JSONbig from 'json-bigint' // 处理与后端数据长度转换问题
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/', // 配置基础路径
  transformResponse: [function(data){
    try { 
      return JSONbig.parse(data)
    } catch (err) {
      console.log('转换失败',err)
      return data
    }
  }]
})
// 配置请求拦截器
request.interceptors.request.use(function (config) {
  // Do something before request is sent

  const {
    user
  } = store.state
  if (user) {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }

  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// 配置响应拦截器

// 导出
export default request
