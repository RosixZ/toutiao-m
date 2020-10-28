/**
 * 文章请求模块
 */
import request from '@/utils/request'
// 获取文章列表
export const getArticles = (params) => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params
  })
}
// 获取文章详情
export const getArticleById = (articleId) => {
  return request({
    method: 'GET',
    url: `/app/v1_0/articles/${articleId}`
  })
}

// 收藏文章
export const collectArticle = (articleId) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/collections',
    data:{
      target: articleId
    }
  })
}
// 取消收藏文章
export const removeCollectArticle = (articleId) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/collections/${articleId}`
  })
}
// 点赞文章
export const addLikingsArticle = (articleId) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data:{
      target: articleId
    }
  })
}
// 取消点赞文章
export const removeLikingsArticle = (articleId) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/article/likings/${articleId}`
  })
}

// 发送评论
export const postComment = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data
  })
}
// 获取评论 /app/v1_0/comments
export const getComments = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}
// 点赞评论
export const addLikingComment = commentId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comment/likings',
    data:{
      target: commentId
    }
  })
}
// 取消点赞评论
export const deleteLikingComment = commentId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/comment/likings/${commentId}`,
  })
}