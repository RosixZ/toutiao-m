import axios from 'axios'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' //配置基础路径
})
//配置请求拦截器
//配置响应拦截器

//导出
export default request
