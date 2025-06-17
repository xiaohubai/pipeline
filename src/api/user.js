import service from '@/utils/request'

export const captcha = () => {
  return service({
    url: '/v1/captcha',
    method: 'get'
  })
}

export const login = (data) => {
  return service({
    url: '/v1/login',
    method: 'post',
    data: data
  })
}