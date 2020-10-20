import request from '@/utils/request'
// import store from '@/store/'
// 登陆
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
// 发送验证码
export const sendCode = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`

  })
}
// 获取用户信息
export const getCurrentUser = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
    // headers: { 放到过滤器中实现
    //   Authorization: `Bearer ${store.state.user.token}`
    // }

  })
}
//  获取我的频道列表
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'

  })
}
// 获取所有频道列表
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'

  })
}
// 批量修改用户列表
export const addUserChannels = (data) => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data
  })
}
// 删除用户指定列表
export const deleteUserChannels = (channelId) => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelId}`
  })
}
// 关注用户  /app/v1_0/user/followings
export const followingUser = (target) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    target
  })
}