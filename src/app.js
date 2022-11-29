const { getInfo } = require('./utils/ajax')
const mail = require('./utils/mail')
const { login } = require('./utils/puppeteer')
require('dotenv').config()

const app = async () => {
  const url = process.env.LOGIN_URL
  // 登录获取 info_url 和 cookie
  const { info_url, cookie } = await login(url)
  // 获取统计信息
  const { points, hp, steam } = await getInfo(info_url, cookie)
  console.log(`当前积分为${points}, 体力为${hp}点, 蒸汽为${steam}克`)
  // mail(new Error('just test it'))
}
module.exports = {
  app,
}
