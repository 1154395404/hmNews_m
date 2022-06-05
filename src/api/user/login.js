import request from '../../utils/request'

export default data => {
  return request({
    method: 'post',
    url: '/v1_0/authorizations',
    data
  })
}
