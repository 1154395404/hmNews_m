import request from '../../utils/request'

export default phone => {
  return request({
    method: 'get',
    url: '/v1_0/sms/codes/' + phone
  })
}
