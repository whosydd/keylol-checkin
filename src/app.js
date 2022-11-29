const { getInfo } = require('./utils/ajax')
const mail = require('./utils/mail')
const { login } = require('./utils/puppeteer')
require('dotenv').config()

const app = async () => {
  const url = process.env.LOGIN_URL

  // 登录获取 cookie
  const { cookie, err } = await login(url)

  if (err != null) {
    mail(err)
    return
  }

  // 获取统计信息 url
  const info_url = `${url}/suid-${process.env.UID}`

  // 获取统计信息
  const { points, hp, steam } = await getInfo(info_url, cookie)
  console.log(`当前积分为${points}, 体力为${hp}点, 蒸汽为${steam}克`)
  // mail(new Error('just test it'))
}
module.exports = {
  app,
}
