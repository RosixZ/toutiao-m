import request from '@/utils/request';

//登陆
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
