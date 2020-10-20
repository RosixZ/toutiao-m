/**
 * 搜索请求的API
 */
import request from '@/utils/request'
// 获取联想
export const getSearchSuggestions = (q) => {
    return request({
      method: 'GET',
      url: '/app/v1_0/suggestion',
      params: {
          q // 联想关键字
      }
    })
  }
// 获取搜索结果
export const getSearchResult = (params) => {
    return request({
      method: 'GET',
      url: '/app/v1_0/search',
      params
    })
  }

// 获取搜索历史
export const getSearchHistories = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search/histories'
  })
}
// 删除单条历史
export const delateSearchHistories = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search/histories'
  })
}
// 删除所有历史
export const delateAllHistories = () =>{
  return request({
    method: 'DELETE',
    url: '/app/v1_0/search/histories'
  })
}