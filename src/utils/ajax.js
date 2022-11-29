const axios = require('axios')
const mail = require('./mail')
require('dotenv').config()

const getInfo = (info_url, cookie) => {
  const req = axios.create({
    timeout: 5000,
    headers: {
      cookie,
    },
  })
  return new Promise(resolve => {
    req
      .get(info_url)
      .then(res => {
        const info = res.data.match(/<li><em>[积分|体力|蒸汽].*<\/li>/g)
        const [points, hp, steam] = info.join('').match(/\d+/g)

        resolve({ points, hp, steam })
      })
      .catch(err => {
        console.log('ajax_err:', err)
        // 出现错误时，发送邮件
        mail(err)
      })
  })
}

module.exports = {
  getInfo,
}
